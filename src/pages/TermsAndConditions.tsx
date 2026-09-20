import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "September 2024";

interface Section { id: string; title: string; }

const SECTIONS: Section[] = [
  { id: "acceptance",    title: "1. Acceptance of Terms" },
  { id: "service",       title: "2. Description of Service" },
  { id: "eligibility",   title: "3. Eligibility" },
  { id: "accounts",      title: "4. User Accounts" },
  { id: "fees",          title: "5. Application Fees" },
  { id: "payments",      title: "6. Payments and Billing" },
  { id: "listings",      title: "7. Internship Listings" },
  { id: "certificates",  title: "8. Certificates" },
  { id: "prohibited",    title: "9. Prohibited Activities" },
  { id: "privacy",       title: "10. Privacy" },
  { id: "liability",     title: "11. Limitation of Liability" },
  { id: "changes",       title: "12. Changes to Terms" },
  { id: "contact",       title: "13. Contact" },
];

interface SectionBlockProps { id: string; title: string; children: React.ReactNode; }
function SectionBlock({ id, title, children }: SectionBlockProps) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-3 pb-2 border-b border-gray-200">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance");

  function handleNavClick(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0a3352] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-medium mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Terms and Conditions</h1>
          <p className="text-white/75 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar TOC */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contents</p>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNavClick(s.id)}
                    className={cn(
                      "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                      activeSection === s.id
                        ? "bg-[#1E3A5F] text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
              Please read these Terms and Conditions carefully before using the Intership platform.
              By accessing or using our services, you agree to be bound by these terms.
            </div>

            <SectionBlock id="acceptance" title="1. Acceptance of Terms">
              <p>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your")
                and Intership Technologies Private Limited ("Intership", "we", "us", or "our"), governing your access to and use
                of the Intership platform available at <strong>www.intership.in</strong> and related mobile or web applications
                (collectively, the "Platform").
              </p>
              <p>
                By registering for an account, browsing internship listings, submitting an application, or otherwise accessing the
                Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                If you do not agree with any provision of these Terms, you must immediately discontinue use of the Platform.
              </p>
              <p>
                These Terms are governed by the laws of India, including the Information Technology Act, 2000 and the rules
                framed thereunder.
              </p>
            </SectionBlock>

            <SectionBlock id="service" title="2. Description of Service">
              <p>
                Intership is an online intermediary platform that connects college students ("Applicants") with companies and
                organisations offering internship opportunities ("Internship Providers"). We facilitate the discovery, application,
                and tracking of internships in various domains across India.
              </p>
              <p>
                <strong>Intership is an intermediary platform only.</strong> We do not employ students, we do not guarantee
                internship placement or selection, and we are not a party to any agreement between an Applicant and an
                Internship Provider. Our role is limited to facilitating introductions and managing the application process.
              </p>
              <p>
                We verify internship listings for basic authenticity before publishing them on the Platform; however, this
                verification does not constitute an endorsement of any Internship Provider or a guarantee of the quality,
                duration, stipend, or outcome of any internship.
              </p>
            </SectionBlock>

            <SectionBlock id="eligibility" title="3. Eligibility">
              <p>
                To use the Intership Platform as a student applicant, you must:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be enrolled in an accredited college or university in India as a full-time or part-time student;</li>
                <li>Be at least 18 years of age, or have obtained verifiable parental or guardian consent if you are below 18;</li>
                <li>Provide accurate, current, and complete information during registration;</li>
                <li>Not be barred from using our services under applicable laws.</li>
              </ul>
              <p>
                Intership reserves the right to verify your eligibility at any time and to suspend or terminate accounts where
                eligibility cannot be confirmed.
              </p>
            </SectionBlock>

            <SectionBlock id="accounts" title="4. User Accounts">
              <p>
                To access most features of the Platform, you must create an account by providing a valid email address,
                mobile number, and academic details. You are responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintaining the confidentiality of your account credentials;</li>
                <li>All activities that occur under your account;</li>
                <li>Notifying us immediately at <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a> of any unauthorised use of your account.</li>
              </ul>
              <p>
                You may not share your account credentials with any third party. Each individual must maintain a separate
                account. Intership shall not be liable for any loss or damage arising from your failure to maintain the security
                of your account.
              </p>
              <p>
                Intership reserves the right to disable or delete accounts found to be in violation of these Terms, used
                fraudulently, or inactive for an extended period.
              </p>
            </SectionBlock>

            <SectionBlock id="fees" title="5. Application Fees">
              <p>
                Intership charges a small, one-time, non-refundable application processing fee per internship application.
                The applicable fee depends on the category of internship:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-semibold text-gray-800">Internship Category</div>
                  <div className="font-semibold text-gray-800">Application Fee</div>
                  <div className="text-gray-600">Standard Internships</div>
                  <div className="text-gray-600 font-medium text-[#1E3A5F]">₹100 per application</div>
                  <div className="text-gray-600">Core Engineering Internships</div>
                  <div className="text-gray-600 font-medium text-[#1E3A5F]">₹150 per application</div>
                </div>
              </div>
              <p>
                Application fees are charged at the time of submission and are <strong>non-refundable</strong> once the payment
                is confirmed, except as set out in our Refund Policy. The fee covers the cost of processing your application,
                verifying your documents, and communicating your profile to the Internship Provider.
              </p>
              <p>
                Payment of the application fee does not guarantee selection, interview, or any form of placement. Intership
                does not retain any additional charges beyond the stated application fee for the internship application process.
              </p>
            </SectionBlock>

            <SectionBlock id="payments" title="6. Payments and Billing">
              <p>
                All payments on the Platform are processed through secure third-party payment gateways (such as Razorpay or
                equivalent) that comply with PCI-DSS standards. Intership does not store your payment card details on its servers.
              </p>
              <p>
                All fees are quoted and charged in Indian Rupees (INR) inclusive of applicable taxes, including Goods and
                Services Tax (GST) as applicable. A payment receipt and GST invoice will be sent to your registered email
                address upon successful payment.
              </p>
              <p>
                In the event of a payment failure, please check your bank statement before attempting another payment.
                For duplicate payments or technical errors, contact us at <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a>{" "}
                within 7 days of the transaction with your payment reference number.
              </p>
            </SectionBlock>

            <SectionBlock id="listings" title="7. Internship Listings">
              <p>
                Internship listings published on the Platform are provided by Internship Providers. Intership conducts
                reasonable due diligence to verify the authenticity of Internship Providers and their listings; however,
                we do not warrant, represent, or guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The accuracy, completeness, or currency of any internship description;</li>
                <li>That any internship will remain available or unfilled at the time of your application;</li>
                <li>That you will be shortlisted, interviewed, or selected for any internship;</li>
                <li>The quality, duration, or outcome of any internship experience;</li>
                <li>That any stipend mentioned will be paid as described.</li>
              </ul>
              <p>
                All selection decisions are made solely by the Internship Provider. Intership has no influence over and
                accepts no responsibility for selection or rejection decisions.
              </p>
            </SectionBlock>

            <SectionBlock id="certificates" title="8. Certificates">
              <p>
                Upon successful completion of an internship, Intership may issue a digital internship completion certificate
                on behalf of or in partnership with the Internship Provider. The issuance of certificates is subject to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confirmation of satisfactory completion from the Internship Provider;</li>
                <li>Submission of any required completion documentation by the student;</li>
                <li>The student's account being in good standing.</li>
              </ul>
              <p>
                Intership is not responsible for delays in certificate issuance caused by Internship Providers failing to
                confirm completion. Students who believe their certificate has been unreasonably delayed may contact us at{" "}
                <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a>.
                Certificates issued through the Platform are digital only; physical certificates are not provided.
              </p>
            </SectionBlock>

            <SectionBlock id="prohibited" title="9. Prohibited Activities">
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Providing false, misleading, or inaccurate information in your profile or application;</li>
                <li>Applying to an internship on behalf of another person;</li>
                <li>Creating multiple accounts to circumvent application limits or suspensions;</li>
                <li>Attempting to reverse-engineer, scrape, or copy any content from the Platform;</li>
                <li>Using automated tools or bots to interact with the Platform;</li>
                <li>Posting or transmitting any content that is unlawful, defamatory, or harmful;</li>
                <li>Interfering with the security or integrity of the Platform;</li>
                <li>Attempting to contact Internship Providers outside the Platform to circumvent application fees;</li>
                <li>Any conduct that violates applicable Indian law, including the IT Act, 2000.</li>
              </ul>
              <p>
                Violation of these prohibitions may result in immediate account suspension, forfeiture of application fees,
                and legal action where warranted.
              </p>
            </SectionBlock>

            <SectionBlock id="privacy" title="10. Privacy">
              <p>
                Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed
                by our{" "}
                <Link to="/privacy" className="text-[#0D9488] underline">Privacy Policy</Link>, which is incorporated into
                and forms part of these Terms. By using the Platform, you consent to the data practices described in our
                Privacy Policy.
              </p>
            </SectionBlock>

            <SectionBlock id="liability" title="11. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Intership, its directors, officers, employees, and agents
                shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but
                not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of internship opportunity or employment;</li>
                <li>Loss of income or anticipated savings;</li>
                <li>Any conduct or content of third-party Internship Providers;</li>
                <li>Unauthorised access to or alteration of your data.</li>
              </ul>
              <p>
                In no event shall Intership's total aggregate liability to you exceed the amount of application fees actually
                paid by you in the three months preceding the event giving rise to the claim. Nothing in these Terms excludes
                or limits liability for fraud, death, or personal injury caused by negligence.
              </p>
            </SectionBlock>

            <SectionBlock id="changes" title="12. Changes to Terms">
              <p>
                Intership reserves the right to modify these Terms at any time. We will notify users of material changes by
                posting a notice on the Platform or sending an email to your registered address at least 7 days before the
                changes take effect.
              </p>
              <p>
                Your continued use of the Platform after the effective date of any changes constitutes your acceptance of
                the updated Terms. If you do not agree to the revised Terms, you must stop using the Platform and may request
                account deletion by contacting us.
              </p>
            </SectionBlock>

            <SectionBlock id="contact" title="13. Contact">
              <p>
                If you have any questions, concerns, or complaints regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-3 text-sm">
                <p className="font-semibold text-[#1E3A5F] mb-2">Intership Technologies Private Limited</p>
                <p>Email: <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a></p>
                <p>Address: Ambikapur, Chhattisgarh, India</p>
                <p className="mt-2 text-gray-500">Response time: Within 2–3 business days</p>
              </div>
            </SectionBlock>
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}
