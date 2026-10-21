import { useState } from "react";
import {
  ArrowLeftRight,
  Scale,
  Ruler,
  Orbit,
  Clock3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const planets = [
  {
    name: "Mercury",
    color: "#A8A29E",
    diameter: 4879,
    mass: 0.055,
    distance: 57.9,
    dayLength: 58.6,
  },
  {
    name: "Venus",
    color: "#F5B971",
    diameter: 12104,
    mass: 0.815,
    distance: 108.2,
    dayLength: 243,
  },
  {
    name: "Earth",
    color: "#60A5FA",
    diameter: 12742,
    mass: 1,
    distance: 149.6,
    dayLength: 1,
  },
  {
    name: "Mars",
    color: "#F87171",
    diameter: 6779,
    mass: 0.107,
    distance: 227.9,
    dayLength: 1.03,
  },
  {
    name: "Jupiter",
    color: "#D6A77A",
    diameter: 139820,
    mass: 317.8,
    distance: 778.6,
    dayLength: 0.41,
  },
  {
    name: "Saturn",
    color: "#D9C18C",
    diameter: 116460,
    mass: 95.2,
    distance: 1433.5,
    dayLength: 0.45,
  },
  {
    name: "Uranus",
    color: "#82D8E8",
    diameter: 50724,
    mass: 14.5,
    distance: 2872.5,
    dayLength: 0.72,
  },
  {
    name: "Neptune",
    color: "#4169E1",
    diameter: 49244,
    mass: 17.1,
    distance: 4495.1,
    dayLength: 0.67,
  },
];

const metrics = {
  diameter: {
    label: "Diameter",
    description: "How wide is the planet?",
    unit: "km",
    icon: Ruler,
    format: (value) => `${value.toLocaleString()} km`,
  },
  mass: {
    label: "Mass",
    description: "Compared with Earth's mass",
    unit: "Earth masses",
    icon: Scale,
    format: (value) => `${value.toLocaleString()} Earths`,
  },
  distance: {
    label: "Distance from Sun",
    description: "Average distance from the Sun",
    unit: "million km",
    icon: Orbit,
    format: (value) => `${value.toLocaleString()} million km`,
  },
  dayLength: {
    label: "Day length",
    description: "Length of one rotation",
    unit: "Earth days",
    icon: Clock3,
    format: (value) => `${value.toLocaleString()} Earth days`,
  },
};

function StatCard({ planet, metric }) {
  const Icon = metric.icon;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111827] p-5">
      <div className="flex items-center justify-between gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: planet.color }}
        />

        <Icon size={19} className="text-slate-500" />
      </div>

      <p className="mt-4 text-sm text-slate-400">{planet.name}</p>

      <p className="mt-2 break-words text-xl font-black text-white sm:text-2xl">
        {metric.format(planet[Object.keys(metrics).find(
          (key) => metrics[key] === metric
        )])}
      </p>
    </div>
  );
}

export default function PlanetComparison() {
  const [firstName, setFirstName] = useState("Earth");
  const [secondName, setSecondName] = useState("Mars");
  const [metricKey, setMetricKey] = useState("diameter");

  const firstPlanet = planets.find(
    (planet) => planet.name === firstName
  );

  const secondPlanet = planets.find(
    (planet) => planet.name === secondName
  );

  const metric = metrics[metricKey];

  const chartData = [
    {
      name: firstPlanet.name,
      value: firstPlanet[metricKey],
      fill: firstPlanet.color,
    },
    {
      name: secondPlanet.name,
      value: secondPlanet[metricKey],
      fill: secondPlanet.color,
    },
  ];

  const difference =
    firstPlanet[metricKey] === secondPlanet[metricKey]
      ? 0
      : Math.abs(
          firstPlanet[metricKey] - secondPlanet[metricKey]
        );

  const largerPlanet =
    firstPlanet[metricKey] > secondPlanet[metricKey]
      ? firstPlanet.name
      : firstPlanet[metricKey] < secondPlanet[metricKey]
        ? secondPlanet.name
        : null;

  const relativeDifference =
    Math.min(firstPlanet[metricKey], secondPlanet[metricKey]) === 0
      ? 0
      : (difference /
          Math.min(firstPlanet[metricKey], secondPlanet[metricKey])) *
        100;

  return (
    <section
      id="comparison"
      className="border-y border-white/[0.06] bg-[#0B101B] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            Compare the worlds
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Planet comparison{" "}
            <span className="text-yellow-400">lab.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Choose two planets and compare their physical characteristics
            using scientific measurements and an interactive chart.
          </p>
        </div>

        {/* Planet selectors */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 sm:p-6">
            <label
              htmlFor="first-planet"
              className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              First planet
            </label>

            <select
              id="first-planet"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080B14] px-4 py-3 text-base text-white outline-none transition focus:border-yellow-400"
            >
              {planets.map((planet) => (
                <option key={planet.name} value={planet.name}>
                  {planet.name}
                </option>
              ))}
            </select>

            <div className="mt-5 flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: firstPlanet.color }}
              />
              <span className="text-lg font-bold">
                {firstPlanet.name}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 sm:p-6">
            <label
              htmlFor="second-planet"
              className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              Second planet
            </label>

            <select
              id="second-planet"
              value={secondName}
              onChange={(event) => setSecondName(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080B14] px-4 py-3 text-base text-white outline-none transition focus:border-yellow-400"
            >
              {planets.map((planet) => (
                <option key={planet.name} value={planet.name}>
                  {planet.name}
                </option>
              ))}
            </select>

            <div className="mt-5 flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: secondPlanet.color }}
              />
              <span className="text-lg font-bold">
                {secondPlanet.name}
              </span>
            </div>
          </div>
        </div>

        {/* Metric selector */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Choose a measurement
          </p>

          <div className="flex flex-wrap gap-2">
            {Object.entries(metrics).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setMetricKey(key)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  metricKey === key
                    ? "border-yellow-400 bg-yellow-400 text-slate-950"
                    : "border-white/10 bg-[#111827] text-slate-300 hover:border-yellow-400/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison result */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#111827] p-5 sm:p-7">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ArrowLeftRight size={17} className="text-yellow-400" />
              Comparison results
            </div>

            <h3 className="mt-5 text-2xl font-black">
              {metric.label}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {metric.description}
            </p>

            <div className="mt-6 space-y-4">
              {[firstPlanet, secondPlanet].map((planet) => (
                <div
                  key={planet.name}
                  className="rounded-xl border border-white/[0.06] bg-[#080B14]/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: planet.color }}
                      />
                      <span className="text-sm text-slate-300">
                        {planet.name}
                      </span>
                    </div>

                    <span className="text-right text-sm font-bold text-white">
                      {metric.format(planet[metricKey])}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-yellow-400/15 bg-yellow-400/[0.05] p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">
                Key finding
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {largerPlanet
                  ? `${largerPlanet} has the higher value for ${metric.label.toLowerCase()}.`
                  : "Both planets have the same value for this measurement."}
              </p>

              {largerPlanet && (
                <p className="mt-2 text-xs text-slate-500">
                  Difference: {metric.format(difference)}
                  {relativeDifference > 0 &&
                    ` (${relativeDifference.toLocaleString(undefined, {
                      maximumFractionDigits: 1,
                    })}% relative to the smaller value)`}
                </p>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#111827] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">Visual comparison</h3>
                <p className="mt-2 text-xs text-slate-500">
                  {metric.label} · {metric.unit}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400">
                Interactive chart
              </div>
            </div>

            <div className="mt-6 h-[290px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 12,
                    right: 8,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    stroke="#273244"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#CBD5E1", fontSize: 12 }}
                    axisLine={{ stroke: "#334155" }}
                    tickLine={false}
                  />

                  <YAxis
                    width={70}
                    tick={{ fill: "#94A3B8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      Number(value).toLocaleString()
                    }
                  />

                  <Tooltip
                    cursor={{ fill: "#FFFFFF", opacity: 0.04 }}
                    contentStyle={{
                      backgroundColor: "#080B14",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#F8FAFC",
                    }}
                    formatter={(value) => [
                      `${Number(value).toLocaleString()} ${metric.unit}`,
                      metric.label,
                    ]}
                  />

                  <Bar
                    dataKey="value"
                    name={metric.label}
                    radius={[7, 7, 0, 0]}
                    maxBarSize={90}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              Select different planets or measurements to update the chart.
              Measurements use different units depending on the selected
              characteristic.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs leading-6 text-slate-500">
          Scientific note: values are approximate. Planetary diameter,
          mass, average distance from the Sun, and rotation period are
          different measurements. A planet's rotation period is not the
          same as the time it takes to orbit the Sun.
        </div>
      </div>
    </section>
  );
}