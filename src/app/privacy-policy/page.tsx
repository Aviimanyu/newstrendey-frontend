import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-16">
      <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Last Updated: March 14, 2026</p>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to Newstrendey. We respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> Includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data:</strong> Includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide you with our news services and content.</li>
            <li>To improve our website, products/services, marketing, customer relationships and experiences.</li>
            <li>To manage our relationship with you including notifying you about changes to our terms or privacy policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Cookies and Advertising</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          <p className="mt-4">
            <strong>Google AdSense:</strong> We may use Google AdSense to serve ads on our website. Google, as a third-party vendor, uses cookies to serve ads on your site. Google's use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">Google Ad and Content Network privacy policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            <br />
            Email: privacy@newstrendey.com
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
