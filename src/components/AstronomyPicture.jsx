import { useEffect, useState } from "react";
import {
  CalendarDays,
  ExternalLink,
  Image as ImageIcon,
  RefreshCw,
  Telescope,
} from "lucide-react";

const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

const NASA_API = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export default function AstronomyPicture() {
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  async function fetchPicture() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(NASA_API);

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "NASA API request limit reached. Please try again later."
            : `Unable to load NASA data (${response.status}).`
        );
      }

      const data = await response.json();

      if (!data.url || !data.title) {
        throw new Error("NASA did not return a valid astronomy picture.");
      }

      setPicture(data);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while loading the astronomy picture."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPicture();
  }, []);

  return (
    <section
      id="cosmic-picture"
      className="border-y border-white/[0.06] bg-[#080B14] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            Powered by NASA
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            The universe,{" "}
            <span className="text-yellow-400">one day at a time.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Discover a new view of the cosmos with NASA's Astronomy
            Picture of the Day, featuring real astronomical imagery and
            explanations.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div
            className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111827] p-8 text-center"
            role="status"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10">
              <RefreshCw className="animate-spin text-yellow-400" size={25} />
            </div>

            <h3 className="text-lg font-bold text-white">
              Exploring the universe...
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Retrieving today's astronomy picture.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center"
            role="alert"
          >
            <Telescope className="mx-auto mb-4 text-red-300" size={34} />

            <h3 className="text-xl font-bold text-white">
              We lost contact with the cosmos.
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
              {error}
            </p>

            <button
              onClick={fetchPicture}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        )}

        {/* Picture */}
        {!loading && !error && picture && (
          <div className="grid gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] lg:grid-cols-[1.15fr_0.85fr]">
            {/* Media */}
            <div className="relative min-h-[300px] bg-[#05070D] lg:min-h-[530px]">
              {picture.media_type === "image" ? (
                <a
                  href={picture.hdurl || picture.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open the full astronomy image"
                  className="group block h-full min-h-[300px] lg:min-h-[530px]"
                >
                  <img
                    src={picture.url}
                    alt={picture.title}
                    className="h-full min-h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.02] lg:min-h-[530px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                    <ImageIcon size={15} />
                    View full image
                    <ExternalLink size={13} />
                  </span>
                </a>
              ) : picture.media_type === "video" ? (
                <iframe
                  src={picture.url}
                  title={picture.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="flex min-h-[300px] items-center justify-center p-8 text-center lg:min-h-[530px]">
                  <p className="text-sm text-slate-400">
                    This media format cannot be previewed here.
                    <a
                      href={picture.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 text-yellow-400 underline"
                    >
                      Open it directly
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Information */}
            <div className="flex flex-col p-6 sm:p-9 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-bold text-yellow-400">
                  NASA APOD
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400">
                  <CalendarDays size={13} />
                  {picture.date}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-black leading-tight text-white sm:text-3xl">
                {picture.title}
              </h3>

              {picture.copyright && (
                <p className="mt-3 text-xs text-slate-500">
                  Image credit: {picture.copyright}
                </p>
              )}

              <div className="my-6 h-px bg-white/[0.08]" />

              <p
                className="text-sm leading-7 text-slate-300"
                style={
                  showFullDescription
                    ? undefined
                    : {
                        display: "-webkit-box",
                        WebkitLineClamp: 7,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }
                }
              >
                {picture.explanation}
              </p>

              {picture.explanation?.length > 350 && (
                <button
                  onClick={() =>
                    setShowFullDescription((previous) => !previous)
                  }
                  className="mt-3 self-start text-sm font-bold text-yellow-400 transition hover:text-yellow-300"
                >
                  {showFullDescription ? "Read less ↑" : "Read full explanation ↓"}
                </button>
              )}

              <div className="mt-auto pt-8">
                <a
                  href="https://apod.nasa.gov/apod/astropix.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
                >
                  Explore NASA APOD
                  <ExternalLink size={16} />
                </a>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Astronomy Picture of the Day is provided by NASA.
                  Image credits and usage terms may vary by item.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}