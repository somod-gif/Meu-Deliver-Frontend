import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Meu Deliver</title>
        <meta
          name="description"
          content="Learn how Meu Deliver collects, uses, and protects your personal information."
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold text-[#00b1a5] mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 4, 2025</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">1. Information We Collect</h2>
            <p>
              We collect personal information such as your name, contact details, delivery address, and payment
              information. We may also collect usage data to improve your experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">2. How We Use Your Information</h2>
            <p>
              Your data helps us process deliveries, improve our service, communicate with you, and personalize your
              experience. We do not sell your information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">3. Data Sharing</h2>
            <p>
              We only share data with trusted third-party services that help us operate — like payment processors,
              delivery partners, and analytics tools. All third parties are contractually bound to keep your data safe.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">4. Data Security</h2>
            <p>
              We use encryption, firewalls, and secure systems to protect your data. Despite these measures, no system
              is 100% secure, but we work hard to keep your data protected.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">5. Your Rights</h2>
            <p>
              You can request access to your data, ask for corrections, or request deletion of your personal
              information at any time by contacting us at{' '}
              <a
                href="mailto:support@meudeliver.com"
                className="text-[#00b1a5] underline hover:text-black"
              >
                support@meudeliver.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">6. Cookies</h2>
            <p>
              We use cookies to enhance user experience, track usage, and remember user preferences. You can manage or
              disable cookies via your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in law, technology, or our practices. We’ll notify
              users when changes are significant.
            </p>
          </div>
        </section>

        <div className="mt-12 text-sm text-gray-600">
          <p>
            If you have any questions about our Privacy Policy, contact us at{' '}
            <a
              href="mailto:support@meudeliver.com"
              className="text-[#00b1a5] underline hover:text-black"
            >
              support@meudeliver.com
            </a>
            . You can also view our{' '}
            <Link href="Pages/Legal/Terms">
              <a className="text-[#00b1a5] underline hover:text-black">Terms & Conditions</a>
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  )
}
