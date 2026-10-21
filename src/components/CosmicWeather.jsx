import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  Atom,
  Clock,
  RefreshCw,
  Satellite,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const NOAA_XRAY_URL =
  "https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json";

const NOAA_KP_URL =
  "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json";

function formatTime(value) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value) {
  if (!value) return "Waiting for data";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return date.toLocaleString();
}

function getKpLevel(value) {
  if (value === null || value === undefined) {
    return {
      label: "Unavailable",
      color: "text-slate-400",
    };
  }

  if (value < 4) {
    return {
      label: "Quiet",
      color: "text-emerald-400",
    };
  }

  if (value < 5) {
    return {
      label: "Unsettled",
      color: "text-yellow-400",
    };
  }

  return {
    label: "Geomagnetic storm",
    color: "text-orange-400",
  };
}

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "text-yellow-400",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5 transition duration-300 hover:border-yellow-400/40 hover:-translate-y-1">
      <div className="mb-5 flex items-center justify-between">
        <div className={`rounded-xl bg-slate-900 p-3 ${color}`}>
          <Icon size={23} />
        </div>

        <span className="text-xs uppercase tracking-widest text-slate-500">
          Live data
        </span>
      </div>

      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 break-words text-2xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

export default function CosmicWeather() {
  const [xrayData, setXrayData] = useState([]);
  const [kpValue, setKpValue] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSpaceWeather() {
    setLoading(true);
    setError("");

    try {
      const [xrayResponse, kpResponse] = await Promise.all([
        fetch(NOAA_XRAY_URL),
        fetch(NOAA_KP_URL),
      ]);

      if (!xrayResponse.ok || !kpResponse.ok) {
        throw new Error("NOAA data is temporarily unavailable.");
      }

      const [xrayJson, kpJson] = await Promise.all([
        xrayResponse.json(),
        kpResponse.json(),
      ]);

      if (!Array.isArray(xrayJson) || !Array.isArray(kpJson)) {
        throw new Error("Unexpected data format received from NOAA.");
      }

      // Keep only recent measurements from the long-wave X-ray channel.
      const cleanXrayData = xrayJson
        .filter(
          (item) =>
            item.energy === "0.1-0.8nm" &&
            Number.isFinite(Number(item.flux)) &&
            item.time_tag
        )
        .slice(-60)
        .map((item) => ({
          time: formatTime(item.time_tag),
          timestamp: item.time_tag,
          flux: Number(item.flux),
        }));

      // Get the latest available planetary K-index.
      const validKpRecords = kpJson.filter(
        (item) =>
          item.time_tag &&
          Number.isFinite(
            Number(item.kp_index ?? item.estimated_kp)
          )
      );

      const latestKpRecord =
        validKpRecords[validKpRecords.length - 1];

      if (cleanXrayData.length === 0 && !latestKpRecord) {
        throw new Error("No usable space-weather measurements were found.");
      }

      setXrayData(cleanXrayData);

      setKpValue(
        latestKpRecord
          ? Number(
              latestKpRecord.kp_index ??
                latestKpRecord.estimated_kp
            )
          : null
      );

      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("Cosmic Weather error:", err);

      setError(
        "Could not load live space-weather data. Check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSpaceWeather();

    const interval = setInterval(fetchSpaceWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const latestXray = xrayData[xrayData.length - 1];

  const xrayFlux = latestXray
    ? latestXray.flux.toExponential(2)
    : "--";

  const kpLevel = getKpLevel(kpValue);

  return (
    <section
      id="cosmic-weather"
      className="relative overflow-hidden bg-[#080B14] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-yellow-400/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              <Activity size={15} />
              Space Environment Monitor
            </div>

            <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Cosmic{" "}
              <span className="text-yellow-400">Weather</span>
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              Explore solar X-ray activity and Earth's geomagnetic
              environment using measurements from NOAA space-weather
              monitoring systems.
            </p>
          </div>

          <button
            onClick={fetchSpaceWeather}
            disabled={loading}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
            {loading ? "Updating..." : "Refresh Data"}
          </button>
        </div>

        {/* Data status */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-[#111827]/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {error ? (
              <AlertCircle className="text-red-400" size={20} />
            ) : (
              <ShieldCheck className="text-emerald-400" size={20} />
            )}

            <div>
              <p className="text-sm font-semibold text-white">
                {error
                  ? "Connection problem"
                  : loading
                    ? "Connecting to NOAA..."
                    : "NOAA data connection"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {error
                  ? error
                  : "Measurements may have a reporting delay."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={15} />

            <span>
              Last successful update:{" "}
              {lastUpdated ? formatDate(lastUpdated) : "Not available"}
            </span>
          </div>
        </div>

        {/* Error retry */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="mb-3 text-sm text-red-300">{error}</p>

            <button
              onClick={fetchSpaceWeather}
              className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Sun}
            title="Solar X-Ray Flux"
            value={xrayFlux}
            subtitle="Latest available measurement in W/m²"
          />

          <StatCard
            icon={Activity}
            title="Planetary K-Index"
            value={kpValue !== null ? kpValue.toFixed(1) : "--"}
            subtitle="A measure of geomagnetic disturbance"
            color="text-cyan-400"
          />

          <StatCard
            icon={Atom}
            title="Geomagnetic Conditions"
            value={kpLevel.label}
            subtitle="Estimated from the latest available K-index"
            color={kpLevel.color}
          />

          <StatCard
            icon={Satellite}
            title="Data Source"
            value="NOAA SWPC"
            subtitle="Space Weather Prediction Center"
            color="text-purple-400"
          />
        </div>

        {/* X-ray chart */}
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-5 sm:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
                  Solar Monitoring
                </span>
              </div>

              <h3 className="text-2xl font-bold">
                Solar X-Ray Activity
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Recent measurements from the GOES X-ray monitoring system.
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 px-4 py-3">
              <p className="text-xs text-slate-500">Latest measurement</p>

              <p className="mt-1 font-semibold text-yellow-400">
                {latestXray
                  ? `${latestXray.flux.toExponential(2)} W/m²`
                  : "No data"}
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            {xrayData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={xrayData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="solarFluxGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#FACC15"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="95%"
                        stopColor="#FACC15"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#273244"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    minTickGap={35}
                  />

                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    tickFormatter={(value) =>
                      Number(value).toExponential(0)
                    }
                    width={75}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#080B14",
                      border: "1px solid #273244",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                    }}
                    labelStyle={{ color: "#FACC15" }}
                    formatter={(value) => [
                      `${Number(value).toExponential(3)} W/m²`,
                      "X-ray flux",
                    ]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />

                  <Area
                    type="monotone"
                    dataKey="flux"
                    stroke="#FACC15"
                    strokeWidth={2}
                    fill="url(#solarFluxGradient)"
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "#FACC15",
                      stroke: "#080B14",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">
                {loading
                  ? "Loading solar measurements..."
                  : "No solar measurements are available right now."}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Source: NOAA GOES X-ray measurements
            </p>

            <a
              href="https://www.swpc.noaa.gov/products/goes-x-ray-flux"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-yellow-400 transition hover:text-yellow-300"
            >
              View official NOAA data ↗
            </a>
          </div>
        </div>

        {/* Educational note */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-[#111827]/70 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Sun className="text-yellow-400" size={23} />

              <h3 className="font-bold">Why monitor the Sun?</h3>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Solar flares can release intense radiation. Strong solar
              activity can affect radio communications, satellites and
              other space-based systems.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111827]/70 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Activity className="text-cyan-400" size={23} />

              <h3 className="font-bold">What is the K-index?</h3>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              The planetary K-index describes disturbances in Earth's
              magnetic field on a scale from 0 to 9. Higher values
              indicate stronger geomagnetic activity.
            </p>
          </div>
        </div>

        {/* Source note */}
        <p className="mt-8 text-center text-xs leading-6 text-slate-600">
          Data provided by NOAA Space Weather Prediction Center.
          This educational dashboard is not an official warning service.
        </p>
      </div>
    </section>
  );
}