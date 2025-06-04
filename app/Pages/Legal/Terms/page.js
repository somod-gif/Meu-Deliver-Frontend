import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Meu Deliver</title>
        <meta name="description" content="Read the terms and conditions for using Meu Deliver's services." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 mt-5 ">
        <h1 className="text-3xl font-bold text-[#00b1a5] mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June  2025</p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">1. Use of Service</h2>
            <p>
              By using Meu Deliver, you agree to provide accurate delivery information and comply with local laws. Misuse or violations may lead to account suspension or termination.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">2. Orders and Payment</h2>
            <p>
              Orders are confirmed upon successful payment. Prices may include delivery and service fees. We reserve the right to modify fees at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">3. Delivery Time</h2>
            <p>
              While we strive to deliver promptly, delays due to traffic, weather, or high demand may occur. We appreciate your understanding in such cases.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">4. Cancellations and Refunds</h2>
            <p>
              Orders can be canceled up to 2 minutes after being placed. Refund eligibility depends on the status of the order and delivery progress.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">5. User Conduct</h2>
            <p>
              Please treat our couriers with respect. Abuse, harassment, or fraudulent activity may result in your account being suspended.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">6. Data Privacy</h2>
            <p>
              Your data is secure with us and used only to enhance your delivery experience. We do not sell or misuse your information. View our{' '}
              <Link href="/privacy" className="text-[#00b1a5] underline hover:text-black">
                Privacy Policy
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">7. Liability</h2>
            <p>
              Meu Deliver is not liable for damage or loss after delivery has been confirmed by the customer. We are also not responsible for delays due to factors beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-black mb-2">8. Changes to Terms</h2>
            <p>
              We may update these terms occasionally to comply with laws or improve service. Continued use of our app means you accept any changes made.
            </p>
          </div>
        </section>

        <div className="mt-12 text-sm text-gray-600">
          <p>
            For any questions, contact us at{' '}
            <a href="mailto:support@meudeliver.com" className="text-[#00b1a5] underline hover:text-black">
              support@meudeliver.com
            </a>.
          </p>
        </div>
      </main>
    </>
  )
}
