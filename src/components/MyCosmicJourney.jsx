import { useEffect, useState } from "react";
import {
  Trophy,
  Orbit,
  Target,
  Medal,
  Sparkles,
  Rocket,
  Star,
  LockKeyhole,
} from "lucide-react";

const achievements = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Begin your cosmic journey.",
    icon: Rocket,
    requirement: (stats) => stats.visits >= 1,
  },
  {
    id: "planet-explorer",
    title: "Planet Explorer",
    description: "Save at least one planet.",
    icon: Orbit,
    requirement: (stats) => stats.savedPlanets >= 1,
  },
  {
    id: "cosmic-genius",
    title: "Cosmic Genius",
    description: "Score at least 8/10 in the quiz.",
    icon: Trophy,
    requirement: (stats) => stats.bestScore >= 8,
  },
  {
    id: "master-explorer",
    title: "Master Explorer",
    description: "Save three or more planets.",
    icon: Medal,
    requirement: (stats) => stats.savedPlanets >= 3,
  },
];

function readNumber(key) {
  try {
    const value = Number(localStorage.getItem(key) || 0);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

export default function MyCosmicJourney() {
  const [stats, setStats] = useState({
    visits: 1,
    savedPlanets: 0,
    bestScore: 0,
  });

  useEffect(() => {
    const visits = readNumber("astronova-visits") + 1;

    try {
      localStorage.setItem("astronova-visits", String(visits));
    } catch {
      // The page still works if browser storage is unavailable.
    }

    setStats({
      visits,
      savedPlanets: readNumber("astronova-saved-planets"),
      bestScore: readNumber("astronova-best-score"),
    });
  }, []);

  const unlockedAchievements = achievements.filter((achievement) =>
    achievement.requirement(stats)
  );

  const progress = Math.round(
    (unlockedAchievements.length / achievements.length) * 100
  );

  return (
    <section
      id="my-journey"
      className="relative overflow-hidden bg-[#080B14] px-5 py-24 text-white sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
            <Sparkles size={14} />
            Personal Space Profile
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            My Cosmic <span className="text-yellow-300">Journey</span>
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Every discovery brings you closer to the stars. Track your
            achievements and see how far your exploration has taken you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-yellow-400/10 p-3 text-yellow-300">
                <Trophy size={24} />
              </div>
              <span className="text-xs text-slate-500">BEST RESULT</span>
            </div>

            <p className="mt-6 text-4xl font-bold">
              {stats.bestScore}
              <span className="ml-2 text-lg font-medium text-slate-500">
                / 10
              </span>
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Your best Cosmic Challenge score
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-blue-400/10 p-3 text-blue-300">
                <Orbit size={24} />
              </div>
              <span className="text-xs text-slate-500">SAVED PLANETS</span>
            </div>

            <p className="mt-6 text-4xl font-bold">{stats.savedPlanets}</p>

            <p className="mt-2 text-sm text-slate-400">
              Planets in your personal collection
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-purple-400/10 p-3 text-purple-300">
                <Target size={24} />
              </div>
              <span className="text-xs text-slate-500">EXPLORATION</span>
            </div>

            <p className="mt-6 text-4xl font-bold">{stats.visits}</p>

            <p className="mt-2 text-sm text-slate-400">
              Visits to your cosmic dashboard
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-300" size={20} />
                <h3 className="text-xl font-bold">Achievement Collection</h3>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Unlock achievements as you explore Astronova.
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-2xl font-bold text-yellow-300">
                {unlockedAchievements.length}/{achievements.length}
              </p>
              <p className="text-xs text-slate-500">BADGES UNLOCKED</p>
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-yellow-300 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-right text-xs text-slate-500">
            {progress}% completed
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => {
              const unlocked = achievement.requirement(stats);
              const Icon = achievement.icon;

              return (
                <div
                  key={achievement.id}
                  className={`rounded-2xl border p-5 transition ${
                    unlocked
                      ? "border-yellow-300/30 bg-yellow-300/5"
                      : "border-white/10 bg-white/[0.02] opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`rounded-xl p-3 ${
                        unlocked
                          ? "bg-yellow-300/10 text-yellow-300"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {unlocked ? (
                      <Sparkles size={17} className="text-yellow-300" />
                    ) : (
                      <LockKeyhole size={17} className="text-slate-500" />
                    )}
                  </div>

                  <h4 className="mt-5 font-bold">{achievement.title}</h4>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">
                    {achievement.description}
                  </p>

                  <p
                    className={`mt-4 text-xs font-semibold ${
                      unlocked ? "text-yellow-300" : "text-slate-500"
                    }`}
                  >
                    {unlocked ? "ACHIEVEMENT UNLOCKED" : "LOCKED"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
          <Sparkles className="mt-1 shrink-0 text-blue-300" size={20} />
          <div>
            <h4 className="font-semibold">Your journey, your progress</h4>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Your achievements are stored in this browser. They are not
              synchronized across devices or browser profiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}