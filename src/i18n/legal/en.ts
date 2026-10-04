// Legal documents: the full privacy policy (below the summary on /privacy) and
// the terms (/terms). Each locale file next to this one exports the same shape:
//   export default { … } satisfies Legal;
//
// Conventions for translators (on top of those in ../ui/en.ts):
// - `id` is the section's link anchor (/terms#acceptable-use). Keep it exactly
//   as in English.
// - {site}, {operator}, {email} and {url} are filled in by the page; keep them.
// - `html` may contain <p>, <ul>/<li>, <strong>, <a> and <code>. Keep the tags
//   and translate the text. Root-relative links (href="/contact") are
//   localized automatically; external links stay as they are.
// - Keep the meaning exact. Where a term has an established legal equivalent
//   in your language ("legitimate interests", "controller", "as is"), use it.

type Section = { id: string; title: string; html: string };

const en = {
  privacy: {
    title: 'Privacy policy',
    intro: 'The full policy, section by section. The summary above is a faithful short version; where they differ, this policy applies.',
    sections: [
      {
        id: 'who-we-are',
        title: 'Who we are',
        html: '<p>This policy applies to {site} at {url} and its image to text tool, operated by {operator} ("we", "us"). It explains what information is processed when you use the site, why, and the choices you have. Under data protection laws such as the EU and UK GDPR, we are the controller of the information described here.</p><p>Questions or requests: <a href="mailto:{email}">{email}</a>.</p>',
      },
      {
        id: 'information-we-process',
        title: 'Information we process',
        html: '<p>The tool is designed to need as little information as possible. This is everything that is processed, and where.</p><ul><li><strong>Images and text you read on your device.</strong> Reading happens in your browser. Your images, the text and your edits are not sent to us, and we can\'t see them.</li><li><strong>Enhanced reading, only if you choose it.</strong> Where this option is offered, the one page image you confirm, resized to at most 2,000 pixels, is sent to our server with the reading mode and languages you picked, and passed to Anthropic to be read. The text is returned to you. We don\'t store the image or the text.</li><li><strong>Images from a link.</strong> If your browser can\'t load an image link directly, our server fetches that image for you and passes it straight back without storing it. To do this, the server receives the link you pasted.</li><li><strong>Technical request data.</strong> Like every website, our server and hosting provider receive the information your browser sends with each request: your IP address, browser type, the page requested and the time. To enforce daily limits on Enhanced reading and link fetching, we count requests per visitor using a hash of the IP address made with a key that changes every day. The counts are discarded daily.</li><li><strong>Messages you send us.</strong> If you email us, we receive your email address and whatever you include in the message.</li><li><strong>Data stored on your device.</strong> Your preferences (such as theme and languages), History if you turn it on, and the cached app and engine files are kept in your browser\'s storage. They stay on your device and are never sent to us.</li></ul><p>There are no accounts, we never ask for your name, and we don\'t use advertising, tracking cookies or third-party analytics.</p>',
      },
      {
        id: 'service-providers',
        title: 'Services involved in running the site',
        html: '<p>A few outside services help deliver the site. None of them receive your images, except Anthropic when you choose Enhanced reading.</p><ul><li><strong>Our hosting provider</strong> runs our server and processes request data on our behalf to deliver the site.</li><li><strong>jsDelivr.</strong> The text engine\'s language files, and the decoder used for iPhone HEIC photos in browsers that can\'t open them natively, are downloaded from the jsDelivr content delivery network. jsDelivr sees your IP address and which file was requested, never your images. See <a href="https://www.jsdelivr.com/terms/privacy-policy" rel="noopener">jsDelivr\'s privacy policy</a>.</li><li><strong>Anthropic</strong>, only for Enhanced reading and only for the page you confirm. It is processed through Anthropic\'s commercial API; Anthropic\'s commercial terms say it doesn\'t train its models on API data by default. See <a href="https://www.anthropic.com/legal/privacy" rel="noopener">Anthropic\'s privacy policy</a>.</li></ul><p>The pages, fonts, scripts and the text engine itself are served from our own domain.</p>',
      },
      {
        id: 'why-we-process-it',
        title: 'Why we process it',
        html: '<p>We process information only for these purposes, on these legal bases under the GDPR:</p><ul><li><strong>To provide the features you ask for</strong>, such as Enhanced reading and fetching an image from a link (performance of a contract, Article 6(1)(b)).</li><li><strong>To keep the site secure and working</strong>, including preventing abuse and enforcing daily limits (our legitimate interests, Article 6(1)(f)).</li><li><strong>To answer your messages</strong> (our legitimate interest in replying to you, Article 6(1)(f)).</li><li><strong>To meet legal obligations</strong>, where a law requires it (Article 6(1)(c)).</li></ul><p>We never sell your information, use it for advertising, or use your images or text to train AI models.</p>',
      },
      {
        id: 'how-long-we-keep-it',
        title: 'How long we keep it',
        html: '<ul><li><strong>Images and text read on your device:</strong> never kept by us. With History on, they stay in your browser until you delete them.</li><li><strong>Enhanced reading and images from a link:</strong> not stored by our server; they exist only while the request is handled. Anthropic\'s retention is described in its privacy policy.</li><li><strong>Daily limit counters:</strong> discarded every day.</li><li><strong>Technical request data:</strong> kept by our server and hosting provider only as long as needed for security and troubleshooting, then deleted.</li><li><strong>Emails:</strong> kept as long as needed to deal with your message and any follow-up, then deleted.</li></ul>',
      },
      {
        id: 'sharing',
        title: 'Who we share it with',
        html: '<p>We don\'t sell or rent personal information, and we don\'t share it for cross-context behavioral advertising. We share it only with the service providers described above, who process it on our behalf, or when the law requires it: for example, to comply with a valid legal request, or to protect the rights and safety of our users and the site.</p>',
      },
      {
        id: 'international-transfers',
        title: 'International transfers',
        html: '<p>Our service providers may process information in countries other than yours, including the United States. Where the law requires it, these transfers rely on appropriate safeguards, such as the European Commission\'s Standard Contractual Clauses.</p>',
      },
      {
        id: 'cookies',
        title: 'Cookies and local storage',
        html: '<p>We don\'t set cookies. The site uses your browser\'s local storage, IndexedDB and cache only for features you use: remembering your theme, languages and settings, keeping History if you turn it on, and letting the tool work offline. None of it is used for tracking or advertising, and you can clear it at any time in your browser\'s settings.</p>',
      },
      {
        id: 'your-rights',
        title: 'Your rights',
        html: '<p>Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict how we use it, to receive it in a portable format, and to withdraw any consent you have given. In the EU, the UK and similar jurisdictions, you can also complain to your data protection authority.</p><p>If you live in California, you have the right to know what personal information we collect and how we use it, to ask us to delete or correct it, and not to be discriminated against for using these rights. We don\'t sell or share personal information as those terms are defined in the CCPA.</p><p>To make a request, email <a href="mailto:{email}">{email}</a>. Because the tool doesn\'t collect your images or text and has no accounts, we usually hold nothing that identifies you, but we will answer every request within the time the law allows. Data on your device is under your control: delete documents from the History panel, or clear this site\'s data in your browser.</p>',
      },
      {
        id: 'children',
        title: 'Children',
        html: '<p>The site is not directed at children under 13, or under 16 in the European Economic Area, and we don\'t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we will delete it.</p>',
      },
      {
        id: 'security',
        title: 'Security',
        html: '<p>The site is served over HTTPS, images are read on your device by default, and our server stores neither images nor text. The link fetcher only connects to public web addresses, with size and time limits. No method of transmission or storage is completely secure, but keeping your data off our servers is the strongest protection we can offer.</p>',
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        html: '<p>If we change this policy, we will update the date at the top of this page. If a change materially affects how your information is handled, we will also point it out on the site before it takes effect.</p>',
      },
      {
        id: 'contact',
        title: 'Contact',
        html: '<p>For anything about privacy, email <a href="mailto:{email}">{email}</a> or use the <a href="/contact">contact page</a>.</p>',
      },
    ] as Section[],
  },

  terms: {
    eyebrow: 'Legal',
    title: 'Terms and conditions',
    lede: 'The agreement between you and us when you use {site}. We have kept it as short and plain as we can.',
    sections: [
      {
        id: 'agreement',
        title: 'Agreeing to these terms',
        html: '<p>These terms apply when you use {site} at {url} (the "site"), including its image to text tool (the "service"). The site is operated by {operator} ("we", "us"). By using the site, you agree to these terms. Our <a href="/privacy">privacy policy</a> explains how we handle your information. If you don\'t agree to these terms, please don\'t use the site.</p>',
      },
      {
        id: 'the-service',
        title: 'The service',
        html: '<p>{site} turns images and PDFs into editable text. Reading happens in your browser by default, and the service is free to use without an account. We may add, change or remove features at any time, and we don\'t guarantee that the service will always be available, uninterrupted or free of errors.</p>',
      },
      {
        id: 'your-content',
        title: 'Your images and text',
        html: '<ul><li><strong>They stay yours.</strong> You keep every right you have in the images you read and the text you get from them. We claim no ownership of either.</li><li><strong>We don\'t receive them</strong> when they are read on your device. If you use Enhanced reading or fetch an image from a link, you allow us and our service providers to process that image only as needed to return the result to you.</li><li><strong>You need the right to use them.</strong> Only read images that you own or are allowed to use, and respect other people\'s copyright, privacy and confidentiality when you use the text.</li></ul>',
      },
      {
        id: 'acceptable-use',
        title: 'Acceptable use',
        html: '<p>Please use the site fairly. You agree not to:</p><ul><li>use the service to break any law or to infringe anyone\'s rights;</li><li>process material that is illegal, or that you have no right to process;</li><li>send automated or bulk requests to our servers, or try to get around daily limits or other protections;</li><li>interfere with the site, disrupt it for other people, or probe it for vulnerabilities without our permission (if you find a security issue, please report it to <a href="mailto:{email}">{email}</a>);</li><li>use the link fetcher to reach addresses you are not allowed to access;</li><li>present the site or its output as a service of your own, or suggest that we endorse you.</li></ul><p>The open-source components of the tool can be used under their own licenses; these rules cover our site and our servers.</p>',
      },
      {
        id: 'accuracy',
        title: 'Accuracy of results',
        html: '<p>Text recognition is never perfect. Results can contain mistakes, especially with handwriting, low-quality photos, small text and complex layouts. Words to check and the confidence level are guides, not guarantees. Always review the text before you rely on it, and take extra care with numbers, names, amounts and anything with legal, medical or financial consequences. You are responsible for how you use the results.</p>',
      },
      {
        id: 'enhanced-reading',
        title: 'Enhanced reading',
        html: '<p>Where it is offered, Enhanced reading sends the page you confirm through our server to Anthropic\'s Claude model. It is optional, limited to a number of pages per visitor per day, and may be changed, limited or withdrawn at any time. When you use it, you also agree not to submit content that breaks <a href="https://www.anthropic.com/legal/aup" rel="noopener">Anthropic\'s usage policy</a>.</p>',
      },
      {
        id: 'our-content',
        title: 'Our content and open-source software',
        html: '<p>The site\'s design, text and graphics, and the {site} name and logo, belong to us or our licensors. You are welcome to link to any page. The text recognition engine and other components are open-source software provided under their own licenses, which apply to those components; the main ones are listed on the <a href="/about">about page</a>.</p>',
      },
      {
        id: 'third-parties',
        title: 'Links and other services',
        html: '<p>The site links to other websites and relies on outside services, such as jsDelivr and, for Enhanced reading, Anthropic. We don\'t control them and aren\'t responsible for their content or practices; their own terms and policies apply.</p>',
      },
      {
        id: 'no-warranty',
        title: 'No warranty',
        html: '<p>The service is free and provided "as is" and "as available". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement.</p>',
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        html: '<p>To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of data, profits, revenue or business, arising from your use of the site or your inability to use it. Our total liability for any claim relating to the site is limited to 50 US dollars or the equivalent in your currency.</p><p>Nothing in these terms limits or excludes liability that cannot be limited or excluded by law, such as liability for fraud, for gross negligence or intentional misconduct, or for death or personal injury caused by negligence.</p>',
      },
      {
        id: 'suspension',
        title: 'Suspending access',
        html: '<p>We may limit, suspend or block access to the site or to server features such as Enhanced reading, for example to stop abuse or to protect the service. You can stop using the site at any time.</p>',
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        html: '<p>We may update these terms from time to time. When we do, we will change the date at the top of this page, and if a change is significant we will point it out on the site before it takes effect. If you keep using the site after a change, you accept the updated terms.</p>',
      },
      {
        id: 'governing-law',
        title: 'Governing law',
        html: '<p>These terms are governed by the laws of the country where {operator} is established, without regard to its conflict-of-law rules. If you are a consumer, you keep the protection of the mandatory laws of the country where you live, and you can bring proceedings in your local courts.</p>',
      },
      {
        id: 'general',
        title: 'General',
        html: '<p>If any part of these terms is found to be unenforceable, the rest stays in effect. If we don\'t enforce a right, we haven\'t waived it. These terms are the entire agreement between you and us about the site. Where a translation of these terms differs from the English version, the English version applies.</p>',
      },
      {
        id: 'contact',
        title: 'Contact',
        html: '<p>Questions about these terms? Email <a href="mailto:{email}">{email}</a> or use the <a href="/contact">contact page</a>.</p>',
      },
    ] as Section[],
  },
};

export default en;
export type Legal = typeof en;
