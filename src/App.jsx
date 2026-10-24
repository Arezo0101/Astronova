import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Menu,
  Orbit,
  Play,
  Rocket,
  Search,
  Sparkles,
  Telescope,
  X,
  Bookmark,
} from "lucide-react";

import SolarSystem3D from "./components/SolarSystem3D";
import PlanetComparison from "./components/PlanetComparison";
import AstronomyPicture from "./components/AstronomyPicture";
import CosmicChallenge from "./components/CosmicChallenge";
import MyCosmicJourney from "./components/MyCosmicJourney";
import MissionControl from "./components/MissionControl";
import CosmicDiscovery from "./components/CosmicDiscovery";
import CosmicWeather from "./components/CosmicWeather";
{/*import SpaceNews from "./components/SpaceNews";*/}
import CosmicProfile from "./components/CosmicProfile";

const planets = [
  {
    name: "Mercury",
    type: "Terrestrial planet",
    color: "#9CA3AF",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=700&q=85",
    description:
      "The smallest planet in our solar system and the closest to the Sun.",
    distance: "57.9M km",
    moons: "0",
  },
  {
    name: "Venus",
    type: "Terrestrial planet",
    color: "#F5B971",
    image:
      "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&w=700&q=85",
    description:
      "A world of extreme heat, thick clouds, and a fascinating atmosphere.",
    distance: "108.2M km",
    moons: "0",
  },
  {
    name: "Earth",
    type: "Our home",
    color: "#60A5FA",
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=700&q=85",
    description:
      "Our pale blue home, the only world currently known to support life.",
    distance: "149.6M km",
    moons: "1",
  },
  {
    name: "Mars",
    type: "The red planet",
    color: "#F87171",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=700&q=85",
    description:
      "A cold desert world with ancient river valleys and a history worth exploring.",
    distance: "227.9M km",
    moons: "2",
  },
];

const discoveries = [
  {
    number: "01",
    title: "Explore the planets",
    description:
      "Travel through our solar system and discover what makes every planet unique.",
    icon: Orbit,
    label: "SOLAR SYSTEM",
    target: "#planets",
  },
  {
    number: "02",
    title: "Discover deep space",
    description:
      "Explore distant galaxies, mysterious nebulae, and the wonders beyond our home.",
    icon: Sparkles,
    label: "DEEP UNIVERSE",
    target: "#cosmic-discovery",
  },
  {
    number: "03",
    title: "Follow space missions",
    description:
      "Learn about the missions pushing the boundaries of human knowledge.",
    icon: Rocket,
    label: "SPACE MISSIONS",
    target: "#missions",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedPlanets, setSavedPlanets] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("astronova-planets") || "[]");
    } catch {
      return [];
    }
  });

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleSavedPlanet = (name) => {
    setSavedPlanets((previous) => {
      const updated = previous.includes(name)
        ? previous.filter((planet) => planet !== name)
        : [...previous, name];

      try {
        localStorage.setItem("astronova-planets", JSON.stringify(updated));
      } catch {
        // The app remains usable if browser storage is unavailable.
      }

      return updated;
    });
  };

  const navItems = [
    ["Home", "home"],
    ["Discover", "discover"],
    ["Planets", "planets"],
    ["Missions", "missions"],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080B14] text-slate-100">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080B14]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => goToSection("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Astronova home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-slate-950 transition-transform group-hover:rotate-12">
              <Orbit size={23} strokeWidth={2.4} />
            </div>

            <div>
              <div className="text-xl font-black tracking-tight">
                ASTRO<span className="text-yellow-400">NOVA</span>
              </div>
              <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.3em] text-slate-500">
                Explore beyond
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="text-sm text-slate-400 transition hover:text-yellow-400"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => {
                setSearchOpen((open) => !open);
                setSearchTerm("");
              }}
              className="rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:border-yellow-400/50 hover:text-yellow-400"
              aria-label="Open planet search"
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            <button
              onClick={() => goToSection("solar-system")}
              className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
            >
              Start exploring <ArrowUpRight size={16} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-[#0D1220] px-5 py-4 md:hidden">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="block w-full border-b border-white/[0.06] py-3 text-left text-sm text-slate-300 hover:text-yellow-400"
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="flex w-full items-center gap-2 py-3 text-sm text-yellow-400"
            >
              <Search size={17} /> Search planets
            </button>
          </nav>
        )}

        {searchOpen && (
          <div className="absolute right-5 top-[84px] z-50 w-[calc(100%-40px)] max-w-sm rounded-2xl border border-white/10 bg-[#111827] p-4 shadow-2xl sm:right-8 lg:right-12">
            <label
              htmlFor="planet-search"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              Search planets
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#080B14] px-3">
              <Search size={17} className="shrink-0 text-yellow-400" />
              <input
                id="planet-search"
                autoFocus
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Try Earth or Mars..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-600"
              />
            </div>

            <div className="mt-3 max-h-64 space-y-1 overflow-y-auto">
              {!searchTerm.trim() ? (
                <p className="py-3 text-sm text-slate-500">
                  Type a planet name to search.
                </p>
              ) : filteredPlanets.length ? (
                filteredPlanets.map((planet) => (
                  <button
                    key={planet.name}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchTerm("");
                      goToSection("planets");
                      setTimeout(() => {
                        document
                          .getElementById(`planet-${planet.name.toLowerCase()}`)
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }, 350);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-white/[0.06]"
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                    <span className="text-sm font-semibold">
                      {planet.name}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="ml-auto text-slate-500"
                    />
                  </button>
                ))
              ) : (
                <p className="py-3 text-sm text-slate-400">
                  No matching planets found.
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative isolate scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-indigo-600/[0.12] blur-[120px]" />
            <div className="absolute -left-32 top-60 h-[360px] w-[360px] rounded-full bg-yellow-500/[0.06] blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.07)_0.5px,transparent_1px)] [background-size:28px_28px] opacity-40" />
          </div>

          <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-20">
            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-yellow-300">
                <Sparkles size={14} />
                YOUR GATEWAY TO THE COSMOS
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
                The universe
                <br />
                is yours to
                <br />
                <span className="relative inline-block text-yellow-400">
                  discover.
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8C70 2 200 2 296 7"
                      stroke="#FACC15"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
                From distant galaxies to the worlds next door, explore the
                wonders of space through science, discovery, and curiosity.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goToSection("solar-system")}
                  className="group flex items-center gap-3 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-yellow-300"
                >
                  Explore the universe
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() => goToSection("planets")}
                  className="flex items-center gap-3 rounded-xl border border-white/10 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/[0.04]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20">
                    <Play size={12} fill="currentColor" />
                  </span>
                  Meet the planets
                </button>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.08] pt-7">
                {[
                  ["8", "Planets"],
                  ["100B+", "Galaxies estimated"],
                  ["∞", "Questions to explore"],
                ].map(([number, label]) => (
                  <div key={label}>
                    <div className="text-xl font-black tracking-tight text-white">
                      {number}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[530px] items-center justify-center py-8 lg:py-0">
              <div className="absolute h-[340px] w-[340px] rounded-full bg-yellow-400/[0.06] blur-[80px] sm:h-[430px] sm:w-[430px]" />
              <div className="absolute h-[310px] w-[310px] rounded-full border border-white/[0.07] sm:h-[420px] sm:w-[420px]" />
              <div className="absolute h-[235px] w-[235px] rounded-full border border-white/[0.09] sm:h-[320px] sm:w-[320px]" />
              <div className="absolute h-[160px] w-[160px] rounded-full border border-white/[0.10] sm:h-[220px] sm:w-[220px]" />

              <div className="relative z-10 h-[290px] w-[290px] overflow-hidden rounded-full shadow-[0_0_100px_rgba(234,179,8,0.12)] sm:h-[400px] sm:w-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&w=900&q=90"
                  alt="A planet in space"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border border-white/10" />
              </div>

              <div className="absolute left-0 top-[18%] z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827]/90 p-3 shadow-xl backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                  <Telescope size={21} />
                </div>
                <div>
                  <div className="text-xs font-bold">Look closer.</div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    Wonder is everywhere
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[14%] right-0 z-20 rounded-2xl border border-white/10 bg-[#111827]/90 p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Universe status
                </div>
                <div className="mt-2 text-lg font-black">
                  Always expanding
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Every discovery begins with a question.
                </div>
              </div>

              <div className="absolute right-[13%] top-[8%] text-yellow-300">
                <Sparkles size={23} />
              </div>
              <div className="absolute bottom-[12%] left-[12%] text-slate-300">
                <Sparkles size={16} />
              </div>
            </div>
          </div>

          <button
            onClick={() => goToSection("discover")}
            className="mx-auto mb-10 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-yellow-400"
          >
            Scroll to discover <ArrowDown size={15} />
          </button>
        </section>

        {/* Discover */}
        <section
          id="discover"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#0B101B] py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>Curiosity starts here</SectionLabel>
                <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
                  A universe of
                  <span className="text-yellow-400"> possibilities.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                Your journey through the cosmos starts with one question.
                Choose a direction and let discovery lead the way.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {discoveries.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.number}
                    onClick={() => goToSection(item.target.slice(1))}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111827] p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 sm:p-8"
                  >
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-yellow-400/[0.04] blur-3xl transition group-hover:bg-yellow-400/[0.12]" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/[0.08] text-yellow-400">
                        <Icon size={23} />
                      </div>
                      <span className="text-sm font-bold text-slate-600">
                        {item.number}
                      </span>
                    </div>

                    <div className="relative mt-10">
                      <div className="text-[10px] font-bold tracking-[0.2em] text-yellow-400">
                        {item.label}
                      </div>
                      <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative mt-7 flex items-center gap-2 text-sm font-semibold text-slate-300 transition group-hover:text-yellow-400">
                      Explore more
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Solar System */}
        <section
          id="solar-system"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#080B14] py-20"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-8">
              <SectionLabel>Explore in three dimensions</SectionLabel>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                Your window into{" "}
                <span className="text-yellow-400">the solar system.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Rotate the scene, zoom into the planets, and select a world to
                discover more about our cosmic neighborhood.
              </p>
            </div>

            <SolarSystem3D />
          </div>
        </section>

        {/* Planets */}
        <section
          id="planets"
          className="scroll-mt-24 border-y border-white/[0.06] bg-[#0B101B] py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionLabel>Meet our neighbors</SectionLabel>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Meet the <span className="text-yellow-400">planets.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Explore some of the worlds in our solar system and save your
              favorites for later.
            </p>

            <div className="mt-8">
              <PlanetComparison />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {planets
                .filter((planet) =>
                  planet.name
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
                )
                .map((planet) => {
                  const saved = savedPlanets.includes(planet.name);

                  return (
                    <article
                      id={`planet-${planet.name.toLowerCase()}`}
                      key={planet.name}
                      className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition hover:-translate-y-1 hover:border-yellow-400/30"
                    >
                      <div className="relative h-44 overflow-hidden bg-[#080B14]">
                        <img
                          src={planet.image}
                          alt={planet.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.opacity = "0";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />
                        <button
                          onClick={() => toggleSavedPlanet(planet.name)}
                          aria-label={
                            saved
                              ? `Remove ${planet.name} from favorites`
                              : `Save ${planet.name} to favorites`
                          }
                          className={`absolute right-3 top-3 rounded-xl border p-2 transition ${
                            saved
                              ? "border-yellow-400 bg-yellow-400 text-slate-950"
                              : "border-white/20 bg-black/40 text-white hover:border-yellow-400 hover:text-yellow-400"
                          }`}
                        >
                          <Bookmark
                            size={17}
                            fill={saved ? "currentColor" : "none"}
                          />
                        </button>
                        <div className="absolute bottom-3 left-4">
                          <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: planet.color }}
                          >
                            {planet.type}
                          </span>
                          <h3 className="mt-1 text-2xl font-black">
                            {planet.name}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="min-h-[72px] text-sm leading-6 text-slate-400">
                          {planet.description}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                          <div>
                            <div className="text-xs text-slate-500">
                              From the Sun
                            </div>
                            <div className="mt-1 text-sm font-bold">
                              {planet.distance}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Moons</div>
                            <div className="mt-1 text-sm font-bold">
                              {planet.moons}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>

            {planets.filter((planet) =>
              planet.name
                .toLowerCase()
                .includes(searchTerm.trim().toLowerCase())
            ).length === 0 && (
              <p className="mt-8 text-center text-slate-400">
                No planets match your search.
              </p>
            )}

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 rounded-lg border border-white/10 px-4 py-2 text-sm text-yellow-400 hover:bg-white/5"
              >
                Clear planet search
              </button>
            )}
          </div>
        </section>

        {/* Astronomy and challenges */}
        <section id="astronomy-picture" className="scroll-mt-24">
          <AstronomyPicture />
        </section>

        <section id="cosmic-challenge" className="scroll-mt-24">
          <CosmicChallenge />
        </section>

        {/* User journey */}
        <section
          id="my-journey"
          className="scroll-mt-24 border-y border-white/[0.06]"
        >
          <MyCosmicJourney />
        </section>

        {/* Missions */}
        <section
          id="missions"
          className="scroll-mt-24 border-y border-white/[0.06]"
        >
          <MissionControl />
        </section>

        {/* Discovery */}
        <section id="cosmic-discovery" className="scroll-mt-24">
          <CosmicDiscovery />
        </section>

        {/* Space weather and news */}
        <section id="cosmic-weather" className="scroll-mt-24">
          <CosmicWeather />
        </section>

        <section id="space-news" className="scroll-mt-24">
          {/*<SpaceNews /> */} 
        </section>

        <section id="cosmic-profile" className="scroll-mt-24">
          <CosmicProfile />
        </section>
        
        {/* Final CTA */}
        <section
          id="begin-journey"
          className="relative scroll-mt-24 overflow-hidden py-24"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/[0.07] blur-[100px]" />

          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
              <Atom size={27} />
            </div>

            <div className="mt-6">
              <SectionLabel>Keep looking up</SectionLabel>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              Every great discovery
              <br />
              <span className="text-yellow-400">starts with curiosity.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              The cosmos is full of unanswered questions. Stay curious, keep
              exploring, and discover something new every day.
            </p>

            <button
              onClick={() => goToSection("my-journey")}
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              Begin your journey <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#060810] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <button
            onClick={() => goToSection("home")}
            className="text-lg font-black tracking-tight"
          >
            ASTRO<span className="text-yellow-400">NOVA</span>
          </button>
          <p className="text-xs text-slate-500">
            Explore beyond. Learn more about our universe.
          </p>
          <button
            onClick={() => goToSection("home")}
            className="text-xs text-slate-400 transition hover:text-yellow-400"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  );
}