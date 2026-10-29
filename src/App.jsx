import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Bookmark,
  Menu,
  Play,
  Orbit,
  Rocket,
  Search,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";

import SolarSystem3D from "./components/SolarSystem3D";
import PlanetComparison from "./components/PlanetComparison";
import AstronomyPicture from "./components/AstronomyPicture";
import CosmicChallenge from "./components/CosmicChallenge";
import MyCosmicJourney from "./components/MyCosmicJourney";
import MissionControl from "./components/MissionControl";
import CosmicDiscovery from "./components/CosmicDiscovery";
import CosmicWeather from "./components/CosmicWeather";
import CosmicProfile from "./components/CosmicProfile";

const planets = [
  {
    name: "Mercury",
    type: "Terrestrial planet",
    description: "The smallest planet, racing around the Sun in just 88 days.",
    color: "from-slate-300 to-slate-500",
    distance: "57.9 million km",
    icon: "☿",
  },
  {
    name: "Venus",
    type: "Terrestrial planet",
    description: "A world of crushing pressure and extreme surface temperatures.",
    color: "from-amber-200 to-orange-500",
    distance: "108.2 million km",
    icon: "♀",
  },
  {
    name: "Earth",
    type: "Terrestrial planet",
    description: "Our home planet, the only world currently known to support life.",
    color: "from-sky-400 to-blue-700",
    distance: "149.6 million km",
    icon: "🌍",
  },
  {
    name: "Mars",
    type: "Terrestrial planet",
    description: "A cold desert with ancient river valleys and towering volcanoes.",
    color: "from-orange-400 to-red-700",
    distance: "227.9 million km",
    icon: "♂",
  },
  {
    name: "Jupiter",
    type: "Gas giant",
    description: "The largest planet, home to immense storms and many moons.",
    color: "from-orange-200 to-amber-700",
    distance: "778.6 million km",
    icon: "♃",
  },
  {
    name: "Saturn",
    type: "Gas giant",
    description: "A giant planet famous for its spectacular rings.",
    color: "from-yellow-200 to-yellow-600",
    distance: "1.43 billion km",
    icon: "♄",
  },
  {
    name: "Uranus",
    type: "Ice giant",
    description: "An icy world that rotates on a dramatically tilted axis.",
    color: "from-cyan-200 to-teal-600",
    distance: "2.87 billion km",
    icon: "♅",
  },
  {
    name: "Neptune",
    type: "Ice giant",
    description: "A distant blue planet with some of the fastest winds in the Solar System.",
    color: "from-blue-400 to-indigo-800",
    distance: "4.50 billion km",
    icon: "♆",
  },
];
const navItems = [
  { label: "Home", id: "home" },
  { label: "Discover", id: "discover" },
  { label: "Planets", id: "planets" },
  { label: "Missions", id: "missions" },
];

const discoveries = [
  {
    number: "01",
    title: "Explore the universe",
    description: "Discover planets, galaxies, and extraordinary cosmic objects.",
    icon: Orbit,
    target: "cosmic-discovery",
  },
  {
    number: "02",
    title: "Learn through challenges",
    description: "Test your astronomy knowledge with interactive quizzes.",
    icon: Atom,
    target: "cosmic-challenge",
  },
  {
    number: "03",
    title: "Follow space missions",
    description: "Explore real missions and the science behind them.",
    icon: Rocket,
    target: "missions",
  },
];

function readSavedPlanets() {
  try {
    const stored = JSON.parse(
      localStorage.getItem("astronova-planets") || "[]"
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const [planetSearch, setPlanetSearch] = useState("");
  const [savedPlanets, setSavedPlanets] = useState(readSavedPlanets);
  const filteredPlanets = useMemo(() => {
    const term = planetSearch.trim().toLowerCase();

    if (!term) return planets;

    return planets.filter((planet) =>
      [
        planet.name,
        planet.type,
        planet.description,
        planet.distance,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [planetSearch]);

  const headerResults = useMemo(() => {
    const term = headerSearch.trim().toLowerCase();

    if (!term) return [];

    return [
      ...planets
        .filter((planet) =>
          `${planet.name} ${planet.type} ${planet.description}`
            .toLowerCase()
            .includes(term)
        )
        .map((planet) => ({
          title: planet.name,
          description: planet.type,
          target: "planets",
        })),
      ...discoveries
        .filter((item) =>
          `${item.title} ${item.description}`.toLowerCase().includes(term)
        )
        .map((item) => ({
          title: item.title,
          description: item.description,
          target: item.target,
        })),
    ].slice(0, 7);
  }, [headerSearch]);

  function goToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function toggleSavedPlanet(name) {
    setSavedPlanets((current) => {
      const updated = current.includes(name)
        ? current.filter((planet) => planet !== name)
        : [...current, name];

      try {
        localStorage.setItem("astronova-planets", JSON.stringify(updated));
      } catch (error) {
        console.error("Could not save favorite planets:", error);
      }

      return updated;
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080b14] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <button
  type="button"
  onClick={() => goToSection("home")}
  className="flex shrink-0 items-center gap-2 text-xl font-black tracking-tight"
  aria-label="Astronova home"
>
  <span className="flex h-10 w-10 items-center justify-center text-yellow-400">
  <Orbit size={34} strokeWidth={2.2} />
</span>

  <span className="text-2xl font-black tracking-tight">
    Astro<span className="text-yellow-400">nova</span>
  </span>
</button>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="text-sm text-slate-300 transition hover:text-yellow-400"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 hover:border-yellow-400/50"
              aria-label="Search Astronova"
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>

            <button
              type="button"
              onClick={() => goToSection("my-journey")}
              className="hidden rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 sm:block"
            >
              My Journey
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="border-t border-white/10 px-5 py-4">
            <div className="mx-auto max-w-3xl">
              <label
                htmlFor="astronova-header-search"
                className="mb-2 block text-sm text-slate-400"
              >
                Search planets and discoveries
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
                <Search size={18} className="shrink-0 text-yellow-400" />
                <input
                  id="astronova-header-search"
                  value={headerSearch}
                  onChange={(event) => setHeaderSearch(event.target.value)}
                  placeholder="Try Mars, galaxies, or missions..."
                  className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-slate-500"
                  autoFocus
                />
              </div>

              {headerSearch.trim() && (
                <div className="mt-3 space-y-2">
                  {headerResults.length ? (
                    headerResults.map((result, index) => (
                      <button
                        type="button"
                        key={`${result.target}-${result.title}-${index}`}
                        onClick={() => {
  const matchedPlanet = planets.find(
    (planet) =>
      planet.name.toLowerCase() === result.title.toLowerCase()
  );

  if (matchedPlanet) {
    setPlanetSearch(matchedPlanet.name);
    goToSection("planets");
  } else {
    goToSection(result.target);
  }
}}
                        className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/5 p-3 text-left transition hover:bg-white/10"
                      >
                        <span>
                          <span className="block font-semibold">
                            {result.title}
                          </span>
                          <span className="mt-1 block text-sm text-slate-400">
                            {result.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-yellow-400"
                        />
                      </button>
                    ))
                  ) : (
                    <p className="py-3 text-sm text-slate-400">
                      No matching results. The universe is large, but this
                      search is not psychic.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {menuOpen && (
          <nav className="border-t border-white/10 px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goToSection(item.id)}
                  className="rounded-lg px-3 py-3 text-left text-slate-300 hover:bg-white/5 hover:text-yellow-400"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToSection("my-journey")}
                className="rounded-lg bg-yellow-400 px-3 py-3 text-left font-bold text-slate-950"
              >My Journey
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section
          id="home"
          className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/astronova-hero.png')" }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(250,204,21,0.13),transparent_32%),radial-gradient(ellipse_at_20%_70%,rgba(59,130,246,0.12),transparent_38%)]" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-sm text-yellow-300">
                <Sparkles size={16} />
                Your gateway to the cosmos
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Explore beyond
                <span className="mt-2 block text-yellow-400">the ordinary.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Discover planets, explore real space missions, learn astronomy,
                and see our universe from a different perspective.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToSection("discover")}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300"
                >
                  Start exploring <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goToSection("solar-system")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold transition hover:border-yellow-400/50 hover:bg-white/5"
                >
                  <Play size={17} /> Explore solar system
                </button>
              </div>
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-7">
                <div>
                  <p className="text-2xl font-black text-yellow-400">8</p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Planets
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-yellow-400">∞</p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Discoveries
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black text-yellow-400">1</p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Shared universe
                  </p>
                </div>
              </div>
            </div>

            
          </div>
          <button
            type="button"
            onClick={() => goToSection("discover")}
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-slate-500 transition hover:text-yellow-400 sm:flex"
          >
            Scroll to explore <ArrowDown size={14} />
          </button>
        </section>

        <section id="discover" className="scroll-mt-24 px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
                  Explore the unknown
                </p>
                <h2 className="text-3xl font-black sm:text-5xl">
                  Your cosmic playground
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                Learn by exploring, comparing, and testing what you know about
                the universe.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {discoveries.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.number}
                    onClick={() => goToSection(item.target)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/[0.05] sm:p-8"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                        <Icon size={23} />
                      </span>
                      <span className="text-sm text-slate-600">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {item.description}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400">
                      Explore <ArrowUpRight size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section id="solar-system" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SolarSystem3D />
          </div>
        </section>

        <section id="planet-comparison" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PlanetComparison />
          </div>
        </section>

        <section id="planets" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
                  Meet our neighbors
                </p>
                <h2 className="text-3xl font-black sm:text-5xl">
                  The eight planets
                </h2>
                <p className="mt-3 max-w-2xl text-slate-400">
                  Browse the planets and save your favorites for your next visit.
                </p>
              </div>

              <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 sm:w-80">
                <Search size={18} className="shrink-0 text-slate-400" />
                <input
                  value={planetSearch}
                  onChange={(event) => setPlanetSearch(event.target.value)}
                  placeholder="Search all 8 planets..."
                  aria-label="Search planets"
                  className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-slate-500"
                />
                {planetSearch && (
                  <button
                    type="button"
                    onClick={() => setPlanetSearch("")}
                    aria-label="Clear planet search"
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredPlanets.map((planet) => {
                const isSaved = savedPlanets.includes(planet.name);

                return (
                  <article
                    key={planet.name}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition hover:-translate-y-1 hover:border-yellow-400/30"
                  >
                    <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_70%)]">
                      <div
                        className={`absolute h-28 w-28 rounded-full bg-gradient-to-br ${planet.color} opacity-20 blur-2xl transition group-hover:opacity-40`}
                      />
                      <div
                        className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${planet.color} text-5xl shadow-2xl transition duration-500 group-hover:scale-110`}
                      >
                        {planet.icon}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSavedPlanet(planet.name)}
                        aria-label={
                          isSaved
                            ? `Remove ${planet.name} from favorites`
                            : `Save ${planet.name} to favorites`
                        }
                        className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                          isSaved
                            ? "border-yellow-400/40 bg-yellow-400 text-slate-950"
                            : "border-white/10 bg-black/20 text-slate-300 hover:border-yellow-400/40 hover:text-yellow-400"
                        }`}
                      >
                        <Bookmark
                          size={18}
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                        {planet.type}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{planet.name}</h3>
                      <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                        {planet.description}
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-xs text-slate-500">
                          Average distance from the Sun
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-200">
                          {planet.distance}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
              </div>

            {filteredPlanets.length === 0 && (
              <div className="rounded-2xl border border-white/10 p-10 text-center">
                <p className="font-semibold">No planets found.</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try a planet name such as Jupiter or Neptune.
                </p>
                <button
                  type="button"
                  onClick={() => setPlanetSearch("")}
                  className="mt-5 rounded-xl bg-yellow-400 px-4 py-2 font-bold text-slate-950"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="astronomy-picture" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AstronomyPicture />
          </div>
        </section>

        <section id="cosmic-challenge" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CosmicChallenge />
          </div>
        </section>

        <section id="my-journey" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <MyCosmicJourney />
          </div>
        </section>
        <MissionControl />

        <CosmicDiscovery />

        <CosmicWeather />

        <section id="profile" className="scroll-mt-24 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CosmicProfile />
          </div>
        </section>

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-yellow-400/20 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.12),transparent_55%),rgba(255,255,255,0.025)] px-6 py-14 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950">
              <Telescope size={28} />
            </div>
            <h2 className="mt-6 text-3xl font-black sm:text-5xl">
              The universe is waiting.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
              Keep exploring, learn something new, and make your next cosmic
              discovery.
            </p>
            <button
              type="button"
              onClick={() => goToSection("discover")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-yellow-300"
            >
              Explore again <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => goToSection("home")}
            className="flex items-center gap-2 self-start font-bold text-slate-200"
          >
            <Orbit size={18} className="text-yellow-400" />
            Astronova
          </button>
          <p>Explore space. Stay curious. Keep looking up.</p>
          <p>Educational project · React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
