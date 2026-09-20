import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "September 2024";

interface Section { id: string; title: string; }

const SECTIONS: Section[] = [
  { id: "collect",    title: "1. Information We Collect" },
  { id: "use",        title: "2. How We Use Information" },
  { id: "sharing",    title: "3. Data Sharing" },
  { id: "storage",    title: "4. Data Storage and Security" },
  { id: "cookies",    title: "5. Cookies" },
  { id: "rights",     title: "6. Your Rights" },
  { id: "retention",  title: "7. Data Retention" },
  { id: "children",   title: "8. Children's Privacy" },
  { id: "changes",    title: "9. Changes to Policy" },
  { id: "contact",    title: "10. Contact" },
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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("collect");

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
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Privacy Policy</h1>
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
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-sm text-blue-800">
              This Privacy Policy explains how Intership Technologies Private Limited collects, uses, and protects
              your personal information when you use our platform. We are committed to protecting your privacy
              in accordance with the Information Technology (Amendment) Act, 2008 and applicable data protection principles.
            </div>

            <SectionBlock id="collect" title="1. Information We Collect">
              <p>We collect information you provide directly and information generated through your use of our Platform.</p>
              <p><strong>Information you provide:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Identity Information:</strong> Full name, date of birth, gender;</li>
                <li><strong>Contact Information:</strong> Email address, mobile phone number;</li>
                <li><strong>Academic Information:</strong> College name, university, branch/stream, year of study, roll number;</li>
                <li><strong>Resume and Portfolio:</strong> Resume (PDF), skills, projects, work experience;</li>
                <li><strong>Payment Information:</strong> Transaction IDs, payment method type (card/UPI/netbanking) — we do not store full card numbers;</li>
                <li><strong>Communication:</strong> Messages sent through our contact form or support channels.</li>
              </ul>
              <p><strong>Information collected automatically:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address and approximate geographic location;</li>
                <li>Browser type, operating system, and device identifiers;</li>
                <li>Pages visited, time spent, and actions taken on the Platform;</li>
                <li>Referral URLs and search queries that led you to our Platform.</li>
              </ul>
            </SectionBlock>

            <SectionBlock id="use" title="2. How We Use Information">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Account Management:</strong> To create, maintain, and authenticate your account;</li>
                <li><strong>Internship Matching:</strong> To match your profile with relevant internship opportunities based on your branch and skills;</li>
                <li><strong>Application Processing:</strong> To submit and track your internship applications, and to share your profile with Internship Providers;</li>
                <li><strong>Payments:</strong> To process application fees and issue receipts and GST invoices;</li>
                <li><strong>Communication:</strong> To send you application status updates, platform notifications, and support responses;</li>
                <li><strong>Platform Improvement:</strong> To analyse usage patterns and improve the user experience;</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulatory requirements;</li>
                <li><strong>Marketing:</strong> To send you relevant updates about new internships or platform features — you may opt out at any time.</li>
              </ul>
              <p>
                We will not use your personal information for any purpose that is incompatible with the purposes described above
                without obtaining your consent or as otherwise required by law.
              </p>
            </SectionBlock>

            <SectionBlock id="sharing" title="3. Data Sharing">
              <p>
                <strong>We do not sell your personal data to third parties.</strong> We share your information only in the
                following limited circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Internship Providers:</strong> When you apply for an internship, we share your application profile
                  (name, academic details, resume, and contact information) with the relevant Internship Provider solely for
                  the purpose of evaluating your application.
                </li>
                <li>
                  <strong>Payment Processors:</strong> We share transaction data with our payment gateway providers (e.g.,
                  Razorpay) to process payments. These providers are contractually bound to use this data only for payment
                  processing.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share data with trusted technology vendors (cloud hosting,
                  email delivery, analytics) who assist in operating our Platform, under strict data processing agreements.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or
                  government authority, or to protect the rights, property, or safety of Intership, our users, or the public.
                </li>
              </ul>
            </SectionBlock>

            <SectionBlock id="storage" title="4. Data Storage and Security">
              <p>
                Your data is stored on servers managed by Supabase (an open-source database platform) hosted on cloud
                infrastructure within data centres that comply with applicable security standards. We take reasonable
                technical and organisational measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Transport Layer Security (TLS/HTTPS) encryption for all data transmitted to and from the Platform;</li>
                <li>Encryption of sensitive data at rest;</li>
                <li>Role-based access controls restricting employee access to personal data;</li>
                <li>Regular security audits and vulnerability assessments.</li>
              </ul>
              <p>
                No method of electronic transmission or storage is 100% secure. While we strive to protect your information,
                we cannot guarantee absolute security. If you believe your account has been compromised, please contact us
                immediately at <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a>.
              </p>
            </SectionBlock>

            <SectionBlock id="cookies" title="5. Cookies">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our Platform. Cookies are
                small text files stored on your device. We use:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for the Platform to function correctly (e.g., authentication tokens, session management);</li>
                <li><strong>Analytics Cookies:</strong> To understand how users interact with our Platform (e.g., Google Analytics or equivalent) — this data is aggregated and anonymised;</li>
                <li><strong>Preference Cookies:</strong> To remember your settings and preferences.</li>
              </ul>
              <p>
                You can control or disable cookies through your browser settings. Please note that disabling essential cookies
                may affect the functionality of the Platform.
              </p>
            </SectionBlock>

            <SectionBlock id="rights" title="6. Your Rights">
              <p>
                Subject to applicable law, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you;</li>
                <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data;</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your personal data, subject to our legal retention obligations;</li>
                <li><strong>Right to Portability:</strong> Request your data in a structured, machine-readable format;</li>
                <li><strong>Right to Object:</strong> Object to processing of your data for direct marketing purposes;</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for optional data processing at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, please email <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a>{" "}
                with the subject line "Data Rights Request". We will respond within 30 days. Identity verification may be
                required before we action your request.
              </p>
            </SectionBlock>

            <SectionBlock id="retention" title="7. Data Retention">
              <p>
                We retain your personal information for as long as your account is active or as needed to provide you with
                our services. Specific retention periods are:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Account information: Retained for the lifetime of your account plus 2 years after deletion;</li>
                <li>Application and payment records: 7 years from the date of the transaction (for tax and legal compliance);</li>
                <li>Support correspondence: 3 years from last interaction;</li>
                <li>Analytics data: Anonymised and retained indefinitely for statistical purposes.</li>
              </ul>
              <p>
                Upon account deletion, we will anonymise or securely delete your personal data except where retention is
                required by law.
              </p>
            </SectionBlock>

            <SectionBlock id="children" title="8. Children's Privacy">
              <p>
                The Intership Platform is intended for college students who are 18 years of age or older. We do not
                knowingly collect personal information from individuals under 18 without verifiable parental or guardian consent.
              </p>
              <p>
                If you are under 18 and wish to use the Platform, you must obtain and submit consent from a parent or
                legal guardian before registering. If we become aware that we have inadvertently collected personal information
                from a minor without appropriate consent, we will take steps to delete that information promptly.
              </p>
              <p>
                If you believe we have collected data from a minor without consent, please contact us at{" "}
                <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a>.
              </p>
            </SectionBlock>

            <SectionBlock id="changes" title="9. Changes to Policy">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements,
                or Platform features. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Update the "Last Updated" date at the top of this page;</li>
                <li>Send a notification to your registered email address;</li>
                <li>Display a prominent notice on the Platform.</li>
              </ul>
              <p>
                We encourage you to review this Policy periodically. Your continued use of the Platform after the effective
                date of any changes signifies your acceptance of the updated Policy.
              </p>
            </SectionBlock>

            <SectionBlock id="contact" title="10. Contact">
              <p>
                For any privacy-related questions, concerns, or requests, please contact our Privacy Officer:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-3 text-sm">
                <p className="font-semibold text-[#1E3A5F] mb-2">Intership Technologies Private Limited</p>
                <p>Email: <a href="mailto:support@intership.in" className="text-[#0D9488] underline">support@intership.in</a></p>
                <p>Subject: Privacy Policy Enquiry</p>
                <p>Address: Ambikapur, Chhattisgarh, India</p>
                <p className="mt-2 text-gray-500">We aim to respond to all privacy requests within 30 days.</p>
              </div>
              <p className="mt-3">
                You also have the right to lodge a complaint with the relevant data protection authority if you believe
                your rights have not been adequately addressed.
              </p>
            </SectionBlock>
          </main>
        </div>
      </div>
    </PublicLayout>
  );
}
