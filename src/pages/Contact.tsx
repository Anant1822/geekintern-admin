import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, MapPin, CheckCircle, AlertCircle,
  ArrowRight, HelpCircle, RefreshCw, Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { value: "general", label: "General Enquiry" },
  { value: "technical", label: "Technical Issue" },
  { value: "payment", label: "Payment Issue" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional().refine(
    (val) => !val || val === "" || /^[6-9]\d{9}$/.test(val),
    "Enter a valid 10-digit mobile number"
  ),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message must be under 2000 characters"),
});

type FormValues = z.infer<typeof schema>;

interface InfoCardProps { icon: React.ReactNode; title: string; children: React.ReactNode; accent: string; }
function InfoCard({ icon, title, children, accent }: InfoCardProps) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className={cn("h-1.5 w-full", accent)} />
      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">{icon}</div>
        <h3 className="font-semibold text-[#1E3A5F] text-base">{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      await api.post("/contact", data);
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to send message. Please try again or email us directly.";
      setServerError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
  }

  function handleRetry() { setServerError(null); setSubmitted(false); reset(); }

  return (
    <PublicLayout>
      {/* 1. Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0D9488] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/15 text-white hover:bg-white/15 border-0 mb-4 text-xs tracking-widest uppercase">Support</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Get in Touch</h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Have a question or need help? Our team is here for you. Reach out through any of the channels below.
          </p>
        </div>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard icon={<Mail className="w-6 h-6 text-[#1E3A5F]" />} title="Email Us" accent="bg-[#1E3A5F]">
            <a href="mailto:thestartup675@gmail.com" className="text-[#0D9488] text-sm font-semibold hover:underline break-all">
              thestartup675@gmail.com
            </a>
            <p className="text-gray-400 text-xs">We reply within 24 hours</p>
          </InfoCard>

          <InfoCard icon={<Clock className="w-6 h-6 text-blue-600" />} title="Operating Hours" accent="bg-blue-600">
            <p className="text-gray-700 text-sm font-medium">Monday – Saturday</p>
            <p className="text-gray-400 text-xs">9:00 AM – 7:00 PM IST</p>
          </InfoCard>

          <InfoCard icon={<MapPin className="w-6 h-6 text-[#F59E0B]" />} title="Our Office" accent="bg-[#F59E0B]">
            <address className="text-gray-600 text-sm not-italic leading-relaxed">
              Geek Intern Technologies<br />
              Ambikapur, Chhattisgarh, India
            </address>
          </InfoCard>
        </div>
      </section>

      {/* 3. Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">Send Us a Message</h2>
            <p className="text-gray-500">Fill out the form below and we'll get back to you promptly.</p>
          </div>

          {submitted ? (
            <Card className="border-0 shadow-md">
              <CardContent className="pt-12 pb-12 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#0D9488]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F]">Message Received!</h3>
                <p className="text-gray-500 max-w-sm text-sm">
                  Thank you for reaching out. We have received your inquiry and our team will get back to you within 24 hours.
                </p>
                <Button onClick={handleRetry} variant="outline" className="mt-2 border-gray-200">
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="p-8">
                {serverError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{serverError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                      <select
                        id="subject"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        {...register("subject")}
                      >
                        <option value="">Select subject...</option>
                        {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your question or issue in detail... (minimum 20 characters)"
                      rows={5}
                      {...register("message")}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-semibold bg-[#1E3A5F] hover:bg-[#162d4a] text-white">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* 4. FAQ Link */}
      <section className="py-12 px-4 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-7 h-7 text-[#F59E0B]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">Have a Common Question?</h3>
            <p className="text-gray-600 text-sm">
              Before reaching out, check our frequently asked questions — you might find your answer instantly.
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white flex-shrink-0 font-semibold">
            <Link to="/#faq">Visit FAQ <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
