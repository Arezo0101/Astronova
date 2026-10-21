"ProfileFavorites.jsx"

import { useState } from "react";

export default function ProfileFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("spaceFavorites")) || [];
    } catch {
      return [];
    }
  });

  const [newFavorite, setNewFavorite] = useState("");

  const addFavorite = (e) => {
    e.preventDefault();

    const name = newFavorite.trim();

    if (!name || favorites.includes(name)) return;

    const updatedFavorites = [...favorites, name];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "spaceFavorites",
      JSON.stringify(updatedFavorites)
    );

    setNewFavorite("");
  };

  const removeFavorite = (item) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite !== item
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "spaceFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-white shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-2xl">
          👨‍🚀
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Space Profile
          </h2>

          <p className="text-sm text-slate-400">
            Your personal space collection
          </p>
        </div>
      </div>

      <form onSubmit={addFavorite} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Add a favorite planet..."
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-purple-400"
        />

        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-4 py-2 font-semibold transition hover:bg-purple-500"
        >
          Add
        </button>
      </form>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          My Favorites
        </h3>

        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
          {favorites.length} items
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-8 text-center">
          <p className="mb-2 text-3xl">🪐</p>

          <p className="text-sm text-slate-400">
            No favorites yet.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Add your favorite planets or space objects.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {favorites.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between rounded-xl bg-slate-800/80 px-4 py-3"
            >
              <span className="flex items-center gap-3">
                <span>🌌</span>
                <span>{item}</span>
              </span>

              <button
                type="button"
                onClick={() => removeFavorite(item)}
                aria-label={`Remove ${item}`}
                className="rounded-lg px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}