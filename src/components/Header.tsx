"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Technology", href: "/technology" },
  { label: "Sports", href: "/sports" },
  { label: "Entertainment", href: "/entertainment" },
  { label: "Automobile", href: "/autos" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-[#1a1a1a] dark:text-white">
              <img
                src="/logo.png"
                alt="Newstrendey"
                className="h-12 w-auto object-contain dark:brightness-90"
                width={200}
                height={48}
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold hover:text-[#1a1a1a]/70 dark:hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] w-56"
              />
            </div>

            {/* Search Button (Replaced Subscribe) */}
            <button 
              onClick={() => handleSearch()}
              className="bg-[#1a1a1a] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#333] transition-all"
            >
              Search
            </button>

            {/* Notification */}
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-[#1a1a1a] transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-slate-100 dark:border-slate-800 pb-4 pt-2 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold px-2 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
