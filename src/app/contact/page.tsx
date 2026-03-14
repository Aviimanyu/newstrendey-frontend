import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Have a story tip, a question, or some feedback? We'd love to hear from you. 
            Fill out the form and our team will get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#1a1a1a] dark:text-white">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Us</p>
                <p className="font-bold">contact@newstrendey.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#1a1a1a] dark:text-white">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Our Office</p>
                <p className="font-bold">123 Media Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full bg-white dark:bg-[#191919] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full bg-white dark:bg-[#191919] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-white dark:bg-[#191919] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Subject</label>
              <select className="w-full bg-white dark:bg-[#191919] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]">
                <option>General Inquiry</option>
                <option>Story Tip</option>
                <option>Advertising</option>
                <option>Technical Issue</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">Message</label>
              <textarea 
                rows={4} 
                placeholder="How can we help?" 
                className="w-full bg-white dark:bg-[#191919] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]"
              ></textarea>
            </div>

            <button className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-xl hover:bg-[#333] transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          <span className="material-symbols-outlined">arrow_back</span> Back to Home
        </Link>
      </div>
    </div>
  );
}
