import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mail,
  Clock,
  CreditCard,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

const LAST_UPDATED = "September 2024";

interface QACardProps {
  icon: React.ReactNode;
  question: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "success";
}

function QACard({ icon, question, children, variant = "default" }: QACardProps) {
  const variantStyles = {
    default: "border-gray-200",
    warning: "border-amber-200 bg-amber-50",
    success: "border-teal-200 bg-teal-50",
  };
  const iconBg = {
    default: "bg-[#1E3A5F]/10 text-[#1E3A5F]",
    warning: "bg-amber-100 text-amber-600",
    success: "bg-teal-100 text-teal-600",
  };
  return (
    <Card className={`border ${variantStyles[variant]} shadow-sm`}>
      <CardContent className="pt-6 pb-6">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg[variant]}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#1E3A5F] mb-2">{question}</h3>
            <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RefundPolicy() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0a3352] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-300 text-sm font-medium mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Refund Policy</h1>
          <p className="text-white/75 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="text-white/65 text-sm mt-2 max-w-2xl">
            We want to be completely transparent about our refund policy. Please read this carefully before
            making a payment on the Intership platform.
          </p>
        </div>
      </section>

      {/* Summary Banner */}
      <section className="py-8 px-4 bg-[#1E3A5F]/5 border-b border-[#1E3A5F]/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">General Rule</p>
                <p className="text-sm font-semibold text-[#1E3A5F]">Non-refundable</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Exceptions</p>
                <p className="text-sm font-semibold text-[#1E3A5F]">Technical errors only</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Processing</p>
                <p className="text-sm font-semibold text-[#1E3A5F]">7–10 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Q&A */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-5">

          <QACard
            icon={<CreditCard className="w-5 h-5" />}
            question="Are application fees refundable?"
            variant="default"
          >
            <p>
              <strong>No.</strong> Application fees paid on the Intership platform are{" "}
              <strong>non-refundable</strong> once payment has been successfully confirmed and your application has
              been submitted.
            </p>
            <p>
              The application fee covers the cost of processing your application, verifying your documents, and
              communicating your profile to the Internship Provider. These costs are incurred regardless of the
              selection outcome.
            </p>
            <p>
              Payment of the application fee does not guarantee shortlisting, interview, selection, or any form of
              internship placement.
            </p>
          </QACard>

          <QACard
            icon={<CheckCircle2 className="w-5 h-5" />}
            question="Under what circumstances can I get a refund?"
            variant="success"
          >
            <p>We will process a refund only in the following exceptional circumstances:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Duplicate Payment:</strong> Your payment was deducted more than once for the same application
                due to a system or gateway error.
              </li>
              <li>
                <strong>Technical Failure:</strong> Payment was successfully deducted from your account but your
                application was not created on the Platform due to a verified technical error on our end.
              </li>
              <li>
                <strong>Listing Withdrawn Before Application Processing:</strong> The internship listing was removed
                by us for being fraudulent or non-compliant immediately after your payment, before your application
                was forwarded to the Internship Provider.
              </li>
            </ul>
            <p className="mt-2">
              In all of the above cases, the refund will be limited to the application fee amount only.
            </p>
          </QACard>

          <QACard
            icon={<XCircle className="w-5 h-5" />}
            question="What situations are NOT eligible for a refund?"
            variant="warning"
          >
            <p>The following circumstances are explicitly <strong>not eligible</strong> for a refund:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Change of mind after payment is confirmed;</li>
              <li>Being rejected or not shortlisted by the Internship Provider;</li>
              <li>Applying to the same internship multiple times (duplicate applications by the same student);</li>
              <li>Ineligibility for the internship discovered after applying (e.g., branch mismatch, graduation year);</li>
              <li>Failure to complete the internship after selection;</li>
              <li>Dissatisfaction with the internship experience;</li>
              <li>Account suspension due to violation of our Terms and Conditions;</li>
              <li>Applying to an internship that is competitive and remains unfilled.</li>
            </ul>
          </QACard>

          <QACard
            icon={<Mail className="w-5 h-5" />}
            question="How do I request a refund?"
            variant="default"
          >
            <p>To request a refund for an eligible case, follow these steps:</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>
                Email us at{" "}
                <a href="mailto:support@intership.in" className="text-[#0D9488] underline font-medium">
                  support@intership.in
                </a>{" "}
                with the subject line: <strong>"Refund Request – [Your Registered Email]"</strong>
              </li>
              <li>
                Include the following in your email:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Your registered name and email address;</li>
                  <li>Payment ID or Transaction Reference Number (available in your email receipt);</li>
                  <li>Date and amount of the payment;</li>
                  <li>Clear description of the issue (e.g., duplicate deduction, application not created);</li>
                  <li>Screenshot or bank statement showing the deduction (if applicable).</li>
                </ul>
              </li>
              <li>
                <strong>Submit within 7 days</strong> of the original payment date. Requests submitted after
                7 days from payment will not be considered.
              </li>
            </ol>
          </QACard>

          <QACard
            icon={<Clock className="w-5 h-5" />}
            question="How long does refund processing take?"
            variant="default"
          >
            <p>
              Once we verify your refund request, we will initiate the refund within{" "}
              <strong>3–5 business days</strong>. The refund will be credited to your original payment method.
              Depending on your bank or payment provider, the amount may reflect in your account within an
              additional 5–7 business days.
            </p>
            <p>
              Total processing time from request approval to credit: <strong>7–10 business days</strong>.
            </p>
            <p>
              We will send you an email confirmation once the refund has been initiated. Please check your spam
              folder if you do not receive a confirmation within 3 business days of approval.
            </p>
          </QACard>

          <QACard
            icon={<RefreshCw className="w-5 h-5" />}
            question="How are refunds credited?"
            variant="default"
          >
            <p>
              Approved refunds are always credited to the <strong>original payment method</strong> used during
              the transaction. We do not issue refunds via cash, cheque, or alternative payment methods.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Credit/Debit Card:</strong> Refunded to the same card — visible on your next billing cycle;</li>
              <li><strong>UPI:</strong> Credited to the linked bank account;</li>
              <li><strong>Net Banking:</strong> Credited to the originating bank account.</li>
            </ul>
            <p className="mt-2">
              If the original payment method is no longer valid (e.g., card expired, account closed), please
              mention this in your refund request email so we can assist you with an alternative.
            </p>
          </QACard>

          <QACard
            icon={<AlertTriangle className="w-5 h-5" />}
            question="What if I accidentally applied to the wrong internship?"
            variant="warning"
          >
            <p>
              Unfortunately, application fees are non-refundable in cases of accidental or incorrect applications.
              We strongly encourage students to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Read the full internship description, including branch requirements and location, before applying;</li>
              <li>Verify that the stipend, duration, and work mode (remote/hybrid/on-site) meet your requirements;</li>
              <li>Double-check the internship domain to confirm it matches your branch of study.</li>
            </ul>
            <p className="mt-2">
              If you have any doubts before applying, contact us on WhatsApp or email before making a payment.
            </p>
          </QACard>

        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F]/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-[#1E3A5F]" />
          </div>
          <h2 className="text-xl font-bold text-[#1E3A5F] mb-2">Still Have Questions?</h2>
          <p className="text-gray-500 text-sm mb-5">
            If your situation is not covered above or you need further clarification, our support team is happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#1E3A5F] hover:bg-[#162d4a] text-white">
              <a href="mailto:support@intership.in">
                <Mail className="w-4 h-4 mr-2" /> Email Support
              </a>
            </Button>
            <Button asChild variant="outline" className="border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white">
              <Link to="/contact">Visit Contact Page</Link>
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            By using Intership, you agree to our{" "}
            <Link to="/terms" className="text-[#0D9488] underline">Terms and Conditions</Link> and this Refund Policy.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
