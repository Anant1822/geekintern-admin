import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle,
  Building2,
  Users,
  BarChart3,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/services/api";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir",
  "Ladakh","Lakshadweep","Puducherry",
];

const BRANCHES = [
  "Computer Science Engineering","Information Technology",
  "Electronics & Communication Engineering","Electrical Engineering",
  "Mechanical Engineering","Civil Engineering","Chemical Engineering",
  "Aerospace Engineering","Biotechnology","Data Science & AI",
  "Artificial Intelligence & ML","Cyber Security",
  "Business Administration (MBA)","Commerce (B.Com)","Science (B.Sc)",
  "Arts / Humanities","Architecture","Pharmacy","Agriculture","Other",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const schema = z.object({
  collegeName: z.string().min(2, "College name is required"),
  universityName: z.string().min(2, "University name is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  contactName: z.string().min(2, "Contact person name is required"),
  officialEmail: z.string().email("Enter a valid official email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  numberOfStudents: z.string().optional(),
  branches: z.array(z.string()).optional(),
  website: z.string().optional().refine(
    (val) => !val || val === "" || /^https?:\/\/.+/.test(val),
    "Enter a valid URL starting with http:// or https://"
  ),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6 pb-6 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
          {icon}
        </div>
        <h3 className="font-semibold text-[#1E3A5F] text-lg">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function CollegeRegister() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { branches: [] },
  });

  const selectedBranches = watch("branches") ?? [];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setFileError(null);
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are accepted.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must not exceed 10 MB.");
      return;
    }
    setUploadedFile(file);
  }

  function removeFile() {
    setUploadedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function formatBytes(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("college_name", data.collegeName);
      formData.append("university", data.universityName);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact_person", data.contactName);
      formData.append("email", data.officialEmail);
      if (data.phone) formData.append("phone", data.phone);
      if (data.numberOfStudents) formData.append("student_count", data.numberOfStudents);
      if (data.website) formData.append("website", data.website);
      if (data.message) formData.append("message", data.message);
      if (data.branches && data.branches.length > 0) {
        data.branches.forEach((branch) => formData.append("branches", branch));
      }
      if (uploadedFile) {
        formData.append("document", uploadedFile);
      }

      // api baseURL is already http://localhost:3001/api, so endpoint is /colleges/inquiry
      await api.post("/colleges/inquiry", formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(', ')
          : "Something went wrong. Please check the entered details and try again.");
      setServerError(errorMsg);
      toast({ title: "Submission failed", description: errorMsg, variant: "destructive" });
    }
  }

  if (submitted) {
    return (
      <PublicLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <Card className="max-w-lg w-full border-0 shadow-xl text-center">
            <CardContent className="pt-12 pb-12 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E3A5F]">Thank You!</h2>
              <p className="text-gray-600 leading-relaxed">
                Your college partnership inquiry has been received. Our team will review your
                details and get in touch within{" "}
                <span className="font-semibold text-[#1E3A5F]">2–3 business days</span>.
              </p>
              <p className="text-sm text-gray-400">
                A confirmation email will be sent to your official email address.
              </p>
              <Button
                className="mt-2 bg-[#1E3A5F] hover:bg-[#162d4a] text-white"
                onClick={() => (window.location.href = "/")}
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E3A5F] to-[#0D9488] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
            College Partnership
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Partner with Intership
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Help your students land verified internships. Join hundreds of colleges across India
            that trust Intership for branch-specific placement support.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1E3A5F] mb-10">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BenefitCard
              icon={<Building2 className="w-7 h-7" />}
              title="Access to Verified Internships"
              description="Your students get access to a curated, fraud-free list of internship opportunities filtered by their engineering or academic branch."
            />
            <BenefitCard
              icon={<Users className="w-7 h-7" />}
              title="Student Placement Support"
              description="We actively support students throughout the application process — from profile building to offer letter tracking."
            />
            <BenefitCard
              icon={<BarChart3 className="w-7 h-7" />}
              title="Real-time Application Tracking"
              description="Placement coordinators get dashboards showing real-time data on applications, selections, and internship completions."
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-2">
              Register Your College
            </h2>
            <p className="text-gray-500">
              Fill in the details below and our partnership team will reach out to you shortly.
            </p>
          </div>

          {serverError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                {/* College & University */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="collegeName">
                      College Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="collegeName"
                      placeholder="e.g. R.V. College of Engineering"
                      {...register("collegeName")}
                      aria-invalid={!!errors.collegeName}
                    />
                    {errors.collegeName && (
                      <p className="text-xs text-red-500">{errors.collegeName.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="universityName">
                      University Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="universityName"
                      placeholder="e.g. Visvesvaraya Technological University"
                      {...register("universityName")}
                      aria-invalid={!!errors.universityName}
                    />
                    {errors.universityName && (
                      <p className="text-xs text-red-500">{errors.universityName.message}</p>
                    )}
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="e.g. Bengaluru"
                      {...register("city")}
                      aria-invalid={!!errors.city}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="state"
                      {...register("state")}
                      className={cn(
                        "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent",
                        errors.state ? "border-red-500" : "border-input"
                      )}
                    >
                      <option value="">Select state...</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact Person */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="contactName">
                      Contact Person Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="Placement Coordinator / Principal"
                      {...register("contactName")}
                      aria-invalid={!!errors.contactName}
                    />
                    {errors.contactName && (
                      <p className="text-xs text-red-500">{errors.contactName.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="officialEmail">
                      Official Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="officialEmail"
                      type="email"
                      placeholder="placement@college.ac.in"
                      {...register("officialEmail")}
                      aria-invalid={!!errors.officialEmail}
                    />
                    {errors.officialEmail && (
                      <p className="text-xs text-red-500">{errors.officialEmail.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Students */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-gray-50 text-sm text-gray-500">
                        +91
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        className="rounded-l-none"
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="numberOfStudents">Approx. Number of Students</Label>
                    <Input
                      id="numberOfStudents"
                      type="number"
                      placeholder="e.g. 2000"
                      min={0}
                      {...register("numberOfStudents")}
                    />
                  </div>
                </div>

                {/* Branches */}
                <div className="space-y-2">
                  <Label>Branches / Programs Offered</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-gray-200 rounded-md p-4 bg-gray-50 max-h-60 overflow-y-auto">
                    <Controller
                      control={control}
                      name="branches"
                      render={({ field }) => (
                        <>
                          {BRANCHES.map((branch) => {
                            const checked = (field.value ?? []).includes(branch);
                            return (
                              <label key={branch} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="accent-[#0D9488] w-4 h-4"
                                  checked={checked}
                                  onChange={() => {
                                    const next = checked
                                      ? (field.value ?? []).filter((b) => b !== branch)
                                      : [...(field.value ?? []), branch];
                                    field.onChange(next);
                                  }}
                                />
                                <span className="text-gray-700">{branch}</span>
                              </label>
                            );
                          })}
                        </>
                      )}
                    />
                  </div>
                  {selectedBranches.length > 0 && (
                    <p className="text-xs text-teal-600">
                      {selectedBranches.length} branch{selectedBranches.length > 1 ? "es" : ""} selected
                    </p>
                  )}
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <Label htmlFor="website">College Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourcollege.ac.in"
                    {...register("website")}
                    aria-invalid={!!errors.website}
                  />
                  {errors.website && (
                    <p className="text-xs text-red-500">{errors.website.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message / Requirements (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your placement needs, preferred internship domains, expected timeline, etc."
                    rows={4}
                    {...register("message")}
                  />
                </div>

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label>
                    Supporting Document (optional){" "}
                    <span className="text-gray-400 font-normal text-xs">PDF only, max 10 MB</span>
                  </Label>
                  {uploadedFile ? (
                    <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-md px-4 py-3">
                      <Upload className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-teal-800 truncate">{uploadedFile.name}</p>
                        <p className="text-xs text-teal-600">{formatBytes(uploadedFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-teal-400 hover:text-red-500 transition-colors"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-md px-6 py-8 text-center cursor-pointer hover:border-[#0D9488] transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                      tabIndex={0}
                      role="button"
                      aria-label="Click to upload PDF document"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PDF file up to 10 MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    aria-label="Upload PDF document"
                  />
                  {fileError && <p className="text-xs text-red-500">{fileError}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base font-semibold bg-[#1E3A5F] hover:bg-[#162d4a] text-white transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Partnership Inquiry"
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to our{" "}
                  <a href="/terms" className="text-[#0D9488] underline">Terms & Conditions</a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#0D9488] underline">Privacy Policy</a>.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
