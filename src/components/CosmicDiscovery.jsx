import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  Orbit,
  Telescope,
  Star,
  ArrowUpRight,
  X,
} from "lucide-react";

const discoveries = [
  {
    id: 1,
    name: "Earth",
    category: "Planet",
    description:
      "Earth is the third planet from the Sun and the only world currently known to support life.",
    facts: [
      "Age: about 4.54 billion years",
      "One natural moon",
      "About 71% of its surface is covered by water",
    ],
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/earth/",
  },
  {
    id: 2,
    name: "Mars",
    category: "Planet",
    description:
      "Mars is a cold desert world with ancient river channels, giant volcanoes, and evidence that liquid water once flowed across its surface.",
    facts: [
      "Known as the Red Planet",
      "Has two small moons",
      "Home to Olympus Mons, a giant volcano",
    ],
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/mars/",
  },
  {
    id: 3,
    name: "Jupiter",
    category: "Planet",
    description:
      "Jupiter is the largest planet in our solar system. Its atmosphere contains powerful storms, including the famous Great Red Spot.",
    facts: [
      "Largest planet in the solar system",
      "Has a faint ring system",
      "Europa, one of its moons, has a subsurface ocean",
    ],
    image:
      "https://images.unsplash.com/photo-1630839437035-dac17da580d0?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/jupiter/",
  },
  {
    id: 4,
    name: "Milky Way",
    category: "Galaxy",
    description:
      "The Milky Way is the barred spiral galaxy that contains our solar system. It includes hundreds of billions of stars.",
    facts: [
      "A barred spiral galaxy",
      "Our solar system lies in the Orion Arm",
      "Its central region contains a supermassive black hole",
    ],
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/universe/galaxies/",
  },
  {
    id: 5,
    name: "Black Hole",
    category: "Cosmic Object",
    description:
      "A black hole is an object whose gravity is so strong that nothing, not even light, can escape from within its event horizon.",
    facts: [
      "The event horizon marks the point of no return",
      "Black holes can form from the collapse of massive stars",
      "Scientists can study them through their effects on nearby matter",
    ],
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/universe/black-holes/",
  },
  {
    id: 6,
    name: "Saturn",
    category: "Planet",
    description:
      "Saturn is a gas giant best known for its spectacular ring system, made mostly of pieces of ice and rocky material.",
    facts: [
      "Sixth planet from the Sun",
      "Has an extensive ring system",
      "Titan, its largest moon, has lakes of liquid hydrocarbons",
    ],
    image:
      "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/saturn/",
  },
  {
    id: 7,
    name: "Nebula",
    category: "Cosmic Object",
    description:
      "A nebula is a vast cloud of gas and dust. Some nebulae are places where new stars form, while others are left behind by dying stars.",
    facts: [
      "Can contain hydrogen, helium, and dust",
      "Some nebulae are stellar nurseries",
      "Different gases can produce different colors in telescope images",
    ],
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/universe/galaxies/",
  },
  {
    id: 8,
    name: "Neptune",
    category: "Planet",
    description:
      "Neptune is a distant ice giant with a deep blue appearance and some of the fastest winds measured in the solar system.",
    facts: [
      "Eighth planet from the Sun",
      "Takes about 165 Earth years to orbit the Sun",
      "Was discovered in 1846",
    ],
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1000&q=80",
    source: "https://science.nasa.gov/neptune/",
  },
];

const categories = [
  "All",
  "Planet",
  "Galaxy",
  "Cosmic Object",
];

export default function CosmicDiscovery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDiscovery, setSelectedDiscovery] = useState(null);
  const [savedDiscoveries, setSavedDiscoveries] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("astronova-discoveries") || "[]"
      );
    } catch {
      return [];
    }
  });

  const filteredDiscoveries = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return discoveries.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
  item.name.toLowerCase().includes(query) ||
  item.category.toLowerCase().includes(query);

return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  function toggleSavedDiscovery(id) {
    setSavedDiscoveries((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id];

      try {
        localStorage.setItem(
          "astronova-discoveries",
          JSON.stringify(updated)
        );
      } catch {
        // Saving may be unavailable in some browser configurations.
      }

      return updated;
    });
  }

  return (
    <section
      id="cosmic-discovery"
      className="relative overflow-hidden bg-[#080B14] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-yellow-400/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
            <Sparkles size={15} />
            Your Cosmic Encyclopedia
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Cosmic <span className="text-yellow-300">Discovery</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Search the universe, discover fascinating cosmic objects, and
            build your own collection of space discoveries.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search Earth, galaxies, planets..."
              aria-label="Search cosmic discoveries"
              className="w-full rounded-2xl border border-white/10 bg-[#111827] py-4 pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-yellow-300/60"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-yellow-300 text-[#080B14]"
                    : "border border-white/10 bg-[#111827] text-slate-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredDiscoveries.length}
            </span>{" "}
            discoveries
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("All");
            }}
            className="text-sm text-yellow-300 hover:text-yellow-200"
          >
            Clear filters
          </button>
        </div>

        {filteredDiscoveries.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredDiscoveries.map((item) => {
              const isSaved = savedDiscoveries.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition hover:-translate-y-1 hover:border-yellow-300/30"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
                      {item.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSavedDiscovery(item.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${item.name} from saved discoveries`
                          : `Save ${item.name}`
                      }
                      className={`absolute right-4 top-4 rounded-full p-2 transition ${
                        isSaved
                          ? "bg-yellow-300 text-[#080B14]"
                          : "border border-white/20 bg-black/50 text-white hover:bg-yellow-300 hover:text-[#080B14]"
                      }`}
                    >
                      <Star
                        size={17}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold">{item.name}</h3>

                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedDiscovery(item)}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 hover:gap-3"
                    >
                      Discover More
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-[#111827]/60 px-6 py-16 text-center">
            <Search className="mx-auto text-slate-500" size={32} />
            <h3 className="mt-4 text-xl font-bold">No discoveries found</h3>
            <p className="mt-2 text-sm text-slate-400">
              Try searching for a planet, galaxy, or cosmic object.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-start gap-3">
            <Telescope size={21} className="mt-1 shrink-0 text-yellow-300" />
            <p className="text-sm leading-6 text-slate-400">
              These introductory descriptions are a curated learning
              collection. Use the linked NASA science pages to explore
              additional information and verify scientific details.
            </p>
          </div>
        </div>
      </div>

      {selectedDiscovery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDiscovery(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="discovery-title"
            className="my-8 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#111827] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-56 sm:h-72">
              <img
                src={selectedDiscovery.image}
                alt={selectedDiscovery.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => setSelectedDiscovery(null)}
                aria-label="Close discovery details"
                className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-yellow-300">
                {selectedDiscovery.category}
              </span>

              <h3 id="discovery-title" className="mt-2 text-3xl font-bold">
                {selectedDiscovery.name}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {selectedDiscovery.description}
              </p>

              <h4 className="mt-7 font-bold">Key Facts</h4>

              <ul className="mt-3 space-y-3">
                {selectedDiscovery.facts.map((fact) => (
                  <li
                    key={fact}
                    className="flex gap-3 text-sm leading-6 text-slate-400"
                  >
                    <Sparkles
                      size={17}
                      className="mt-1 shrink-0 text-yellow-300"
                    />
                    {fact}
                  </li>
                ))}
              </ul>

              <a
                href={selectedDiscovery.source}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 font-bold text-[#080B14] transition hover:bg-yellow-200"
              >
                Read NASA Science
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}