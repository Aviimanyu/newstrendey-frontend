import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#191919] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 text-[#1a1a1a] dark:text-white mb-6">
              <span className="material-symbols-outlined text-3xl">newspaper</span>
              <span className="text-2xl font-black tracking-tighter">NEWSTRENDEY</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              A global news organization dedicated to delivering accurate, unbiased, and high-quality journalism.
              Our mission is to inform the world with integrity and depth.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-sm">language</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-sm">rss_feed</span>
              </a>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Sections</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/technology" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Technology</Link></li>
              <li><Link href="/sports" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Sports</Link></li>
              <li><Link href="/entertainment" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Entertainment</Link></li>
              <li><Link href="/automobile" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Automobile</Link></li>
              <li><a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Business</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Careers</a></li>
              <li><Link href="/contact" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors">Newsletters</a></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Trust &amp; Ethics</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">verified</span>Editorial Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">gavel</span>Fact-Checking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">shield</span>Ethics Code
                </a>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-[#1a1a1a] dark:hover:text-white transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">policy</span>Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2026 Newstrendey Global Media. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
