import { useMemo, useState } from "react";
import {
  Rocket,
  Search,
  ArrowUpRight,
  Satellite,
  Telescope,
  Globe2,
  Filter,
} from "lucide-react";

const missions = [
  {
    id: 1,
    name: "Artemis Program",
    agency: "NASA",
    category: "Moon",
    status: "In Progress",
    year: "2026",
    description:
      "A program designed to return humans to the Moon and prepare for future crewed missions to Mars.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    link: "https://www.nasa.gov/humans-in-space/artemis/",
  },
  {
    id: 2,
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    category: "Deep Space",
    status: "Active",
    year: "2021",
    description:
      "An advanced space telescope studying distant galaxies, exoplanets, and the early universe.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    link: "https://science.nasa.gov/mission/webb/",
  },
  {
    id: 3,
    name: "Europa Clipper",
    agency: "NASA",
    category: "Planetary Science",
    status: "In Transit",
    year: "2024",
    description:
      "A spacecraft investigating Jupiter's moon Europa and whether its environment could support life.",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=900&q=80",
    link: "https://science.nasa.gov/mission/europa-clipper/",
  },
  {
    id: 4,
    name: "Euclid",
    agency: "ESA",
    category: "Deep Space",
    status: "Active",
    year: "2023",
    description:
      "A space telescope mapping the universe to investigate dark matter and dark energy.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
    link: "https://www.esa.int/Science_Exploration/Space_Science/Euclid",
  },
  {
    id: 5,
    name: "Parker Solar Probe",
    agency: "NASA",
    category: "Sun",
    status: "Active",
    year: "2018",
    description:
      "A spacecraft studying the Sun's outer atmosphere and solar wind at close range.",
    image:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=900&q=80",
    link: "https://science.nasa.gov/mission/parker-solar-probe/",
  },
  {
    id: 6,
    name: "Voyager",
    agency: "NASA",
    category: "Deep Space",
    status: "Active",
    year: "1977",
    description:
      "Two historic spacecraft exploring the outer solar system and interstellar space.",
    image:
      "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=900&q=80",
    link: "https://science.nasa.gov/mission/voyager/",
  },
];

const categories = [
  "All Missions",
  "Moon",
  "Deep Space",
  "Planetary Science",
  "Sun",
];

export default function MissionControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Missions");

  const filteredMissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return missions.filter((mission) => {
      const matchesCategory =
        activeCategory === "All Missions" ||
        mission.category === activeCategory;

      const matchesSearch =
        mission.name.toLowerCase().includes(query) ||
        mission.agency.toLowerCase().includes(query) ||
        mission.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section
      id="missions"
      className="relative overflow-hidden bg-[#080B14] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              <Satellite size={15} />
              Explore Beyond Earth
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Mission <span className="text-yellow-300">Control</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Explore ambitious missions that are expanding our understanding
              of the Moon, the Sun, distant planets, and the universe.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-4">
            <Rocket className="text-yellow-300" size={25} />
            <div>
              <p className="text-2xl font-bold">{filteredMissions.length}</p>
              <p className="text-xs text-slate-400">MISSIONS DISPLAYED</p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search missions, agencies, or discoveries..."
              aria-label="Search space missions"
              className="w-full rounded-2xl border border-white/10 bg-[#111827] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-300/60"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <Filter size={18} className="shrink-0 text-yellow-300" />

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-yellow-300 text-[#080B14]"
                    : "border border-white/10 bg-[#111827] text-slate-400 hover:border-yellow-300/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredMissions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMissions.map((mission) => (
              <article
                key={mission.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition duration-300 hover:-translate-y-1 hover:border-yellow-300/30"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={mission.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/10" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {mission.category}
                  </span>

                  <span className="absolute bottom-4 left-4 rounded-full bg-yellow-300/10 px-3 py-1.5 text-xs font-semibold text-yellow-300 backdrop-blur">
                    {mission.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {mission.agency} · {mission.year}
                      </p>

                      <h3 className="mt-2 text-xl font-bold transition group-hover:text-yellow-300">
                        {mission.name}
                      </h3>
                    </div>

                    <div className="rounded-xl border border-white/10 p-2 text-yellow-300">
                      {mission.category === "Moon" ? (
                        <Globe2 size={20} />
                      ) : mission.category === "Deep Space" ? (
                        <Telescope size={20} />
                      ) : (
                        <Satellite size={20} />
                      )}
                    </div>
                  </div>

                  <p className="mt-4 min-h-20 text-sm leading-6 text-slate-400">
                    {mission.description}
                  </p>

                  <a
                    href={mission.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition hover:gap-3"
                  >
                    Explore Mission
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-[#111827]/60 px-6 py-16 text-center">
            <Search className="mx-auto text-slate-500" size={32} />
            <h3 className="mt-4 text-xl font-bold">No missions found</h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All Missions");
              }}
              className="mt-5 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-[#080B14]"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <Telescope size={20} className="mt-1 shrink-0 text-yellow-300" />
          <p className="text-sm leading-6 text-slate-400">
            Mission statuses and descriptions should be checked against the
            linked official agency pages. The information displayed here is
            a curated overview, not a live mission-tracking feed.
          </p>
        </div>
      </div>
    </section>
  );
}