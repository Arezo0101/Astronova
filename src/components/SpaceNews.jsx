import { useEffect, useState } from "react";
import { Newspaper, ExternalLink, RefreshCw, Rocket } from "lucide-react";

const API_URL = "https://api.spaceflightnewsapi.net/v4/articles/?limit=6";

export default function SpaceNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load space news.");
      }

      const data = await response.json();
      setArticles(data.results || []);
    } catch {
      setError("Could not load space news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section
      id="space-news"
      className="border-y border-white/[0.06] bg-[#080B14] py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">
              <Newspaper size={16} />
              Latest updates
            </div>

            <h2 className="text-3xl font-black sm:text-5xl">
              Space <span className="text-yellow-400">News.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Discover the latest discoveries, missions, and developments
              from across the universe.
            </p>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-yellow-400/50 hover:text-yellow-400 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh news
          </button>
        </div>

        {loading ? (
          <div className="grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950"
            >
              Try again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <p className="mt-10 text-slate-400">No articles found.</p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111827] transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-yellow-400">
                      <Rocket size={42} />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-xs text-yellow-300 backdrop-blur">
                    {article.news_site || "Space News"}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-slate-500">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString()
                      : "Recent"}
                  </p>

                  <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-7 transition group-hover:text-yellow-400">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                    {article.summary || "Read the article for more details."}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300"
                  >
                    Read full article
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}