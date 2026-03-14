import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-16">
      <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Last Updated: March 14, 2026</p>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using Newstrendey, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
            If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Newstrendey's website for personal, 
            non-commercial transitory viewing only.
          </p>
          <p className="mt-2 text-sm italic">
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>Attempt to decompile or reverse engineer any software contained on Newstrendey's website;</li>
            <li>Remove any copyright or other proprietary notations from the materials; or</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
          <p>
            The materials on Newstrendey's website are provided on an 'as is' basis. Newstrendey makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of 
            merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
          <p>
            In no event shall Newstrendey or its suppliers be liable for any damages (including, without limitation, damages for loss of data 
            or profit, or due to business interruption) arising out of the use or inability to use the materials on Newstrendey's website, 
            even if Newstrendey or a Newstrendey authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Newstrendey 
            operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          <span className="material-symbols-outlined">arrow_back</span> Back to Home
        </Link>
      </div>
    </div>
  );
}
