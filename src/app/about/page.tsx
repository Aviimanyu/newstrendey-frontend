import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 tracking-tight">About Newstrendey</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The premier destination for the latest news and industry analysis across technology, sports, entertainment, and automobiles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Newstrendey was founded with a simple goal: to provide high-quality, accurate, and unbiased journalism in a fast-paced digital world. 
            We believe that well-informed citizens are the foundation of a healthy society.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our team of dedicated writers and analysts work around the clock to bring you stories that matter, 
            from breaking tech innovations to deep dives into the world of sports and entertainment.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl mb-4 text-[#1a1a1a] dark:text-white">newspaper</span>
            <p className="font-bold text-lg">Informing the world since 2024</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-black">What We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "Technology", icon: "terminal", desc: "Future trends & Silicon Valley" },
            { tag: "Sports", icon: "sports_score", desc: "Latest scores & athlete insights" },
            { tag: "Entertainment", icon: "movie", desc: "Hollywood, music, and pop culture" },
            { tag: "Automobile", icon: "directions_car", desc: "Future of mobility & EV tech" },
          ].map((item) => (
            <div key={item.tag} className="border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:shadow-lg transition-all group">
              <span className="material-symbols-outlined mb-4 text-3xl group-hover:text-blue-600 transition-colors">{item.icon}</span>
              <h3 className="font-bold mb-2">{item.tag}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 p-10 bg-[#1a1a1a] text-white rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Stay updated with our curated selection of top stories delivered to your inbox every week.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-white text-[#1a1a1a] font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition-all"
        >
          Subscribe to Newsletter
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          <span className="material-symbols-outlined">arrow_back</span> Back to Home
        </Link>
      </div>
    </div>
  );
}
