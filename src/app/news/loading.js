// app/news/loading.js — shown instantly by Next.js while the page fetches data

export default function NewsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      {/* Header skeleton */}
      <div className="mb-10 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
        <div className="h-9 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      </div>

      {/* Article skeletons */}
      <div className="space-y-0 divide-y divide-slate-200 dark:divide-slate-800">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="py-8 flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="md:w-64 lg:w-72 shrink-0">
              <div className="aspect-[4/3] rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
            {/* Text */}
            <div className="flex-1 space-y-3">
              <div className="flex gap-3">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-7 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-7 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="flex justify-between pt-2">
                <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
