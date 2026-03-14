"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getPosts, getFeaturedImage, getAuthor, getPrimaryCategory, getCategorySlug, stripHtml, formatDate, estimateReadTime } from "@/lib/wp";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const result = await getPosts({ page, search: query });
        
        // Improve relevance by sorting title matches to the top
        const lowerQuery = query.toLowerCase();
        const sortedPosts = result.posts.sort((a: any, b: any) => {
          const titleA = (a.title?.rendered || "").toLowerCase();
          const titleB = (b.title?.rendered || "").toLowerCase();
          const slugA = (a.slug || "").toLowerCase();
          const slugB = (b.slug || "").toLowerCase();

          const aHasTitleMatch = titleA.includes(lowerQuery) || slugA.includes(lowerQuery);
          const bHasTitleMatch = titleB.includes(lowerQuery) || slugB.includes(lowerQuery);

          if (aHasTitleMatch && !bHasTitleMatch) return -1;
          if (!aHasTitleMatch && bHasTitleMatch) return 1;
          return 0;
        });

        setPosts(sortedPosts);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch results");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      {/* Page Header */}
      <div className="mb-10 border-b-2 border-[#1a1a1a] dark:border-white pb-6">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
          Search Results
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {query ? (
            <>Showing results for <span className="text-[#1a1a1a] dark:text-white font-bold italic">"{query}"</span></>
          ) : (
            "No search query provided."
          )}
        </p>
        {!error && !loading && query && (
          <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">
            {total} articles found — Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-[#1a1a1a] rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Searching articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <span className="material-symbols-outlined text-5xl text-red-400">wifi_off</span>
          <h2 className="text-xl font-bold">Search failed</h2>
          <p className="text-slate-500 text-sm max-w-md">{error}</p>
        </div>
      )}

      {/* No Query or No Results */}
      {!error && !loading && (!query || posts.length === 0) && (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
          <span className="material-symbols-outlined text-7xl text-slate-200 dark:text-slate-800">search_off</span>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">We couldn't find a match</h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              {query ? `We couldn't find any articles matching "${query}". Try different keywords or check for typos.` : "Please enter a search term in the search bar above."}
            </p>
          </div>
          <Link 
            href="/" 
            className="bg-[#1a1a1a] text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Results Grid */}
      {!error && !loading && posts.length > 0 && (
        <div className="space-y-0 divide-y divide-slate-200 dark:divide-slate-800">
          {posts.map((post) => {
            const image = getFeaturedImage(post);
            const author = getAuthor(post);
            const category = getPrimaryCategory(post);
            const title = stripHtml(post.title?.rendered ?? "");
            const excerpt = stripHtml(post.excerpt?.rendered ?? "");
            const date = formatDate(post.date);
            const readTime = estimateReadTime(post.content?.rendered);

            return (
              <article key={post.id} className="group py-8 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-900/50 -mx-4 px-4 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {image && (
                    <Link
                      href={`/${getCategorySlug(post)}/${post.slug}`}
                      className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 w-full md:w-72 lg:w-80 shrink-0 aspect-[16/10]"
                    >
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      {category && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
                          {category}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-medium">{date}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-medium">{readTime} min read</span>
                    </div>

                    <h2 className="text-xl md:text-3xl font-black leading-tight mb-4 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      <Link href={`/${getCategorySlug(post)}/${post.slug}`}>{title}</Link>
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                        <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                        </span>
                        {author}
                      </div>
                      <Link
                        href={`/${getCategorySlug(post)}/${post.slug}`}
                        className="text-xs font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white hover:underline flex items-center gap-2"
                      >
                        Read Post <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !error && !loading && query && (
        <nav className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          {page > 1 && (
            <Link
              href={`/search?q=${query}&page=${page - 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <span className="material-symbols-outlined text-sm">west</span>
              Previous
            </Link>
          )}

          {page < totalPages && (
            <Link
              href={`/search?q=${query}&page=${page + 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
            >
              Next
              <span className="material-symbols-outlined text-sm">east</span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-slate-500 animate-pulse font-bold tracking-widest uppercase">Loading results...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
