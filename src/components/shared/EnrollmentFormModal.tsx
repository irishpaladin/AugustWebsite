import React, { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

type AgeTierId = "infant" | "toddler" | "preschool"
type ContactMethod = "phone" | "text" | "email"

type DaysOfCare = {
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
}

type FormState = {
  // Parent / Guardian Information (required)
  parentName: string
  phoneNumber: string
  emailAddress: string
  preferredContact: ContactMethod | ""

  // Child Information (required)
  childName: string
  childDobOrAge: string
  numberOfChildren: string

  // Care Details (optional)
  desiredStartDate: string
  daysOfCare: DaysOfCare
  hoursNeeded: string

  // Additional Information (optional)
  allergiesHas: "no" | "yes" | ""
  allergiesExplain: string
  referralSource: string
  questionsOrComments: string
}

type FormErrors = Partial<Record<keyof FormState, boolean>>

type Props = {
  open: boolean
  onClose: () => void
  tierId: AgeTierId
  pdfUrl: string
}

const TO_EMAIL = "august.daycare@outlook.com"

const initialState: FormState = {
  parentName: "",
  phoneNumber: "",
  emailAddress: "",
  preferredContact: "",

  childName: "",
  childDobOrAge: "",
  numberOfChildren: "1",

  desiredStartDate: "",
  daysOfCare: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  },
  hoursNeeded: "",

  allergiesHas: "",
  allergiesExplain: "",
  referralSource: "",
  questionsOrComments: "",
}

function enc(v: string) {
  // encodeURIComponent already uses %20 for spaces, but this guarantees it stays that way
  return encodeURIComponent(v).replace(/%0D%0A/g, "%0A") // optional: normalize newlines
}

function buildMailto({ to, subject, body }: { to: string; subject: string; body: string }) {
  return `mailto:${encodeURIComponent(to)}?subject=${enc(subject)}&body=${enc(body)}`
}

export default function EnrollmentFormModal({ open, onClose, tierId, pdfUrl }: Props) {
  const title = "Enrollment Form"

  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const req = <span className="ml-0.5 text-red-500">*</span>

  const daysLabel = useMemo(() => {
    const map: Array<[keyof DaysOfCare, string]> = [
      ["monday", "Mon"],
      ["tuesday", "Tue"],
      ["wednesday", "Wed"],
      ["thursday", "Thu"],
      ["friday", "Fri"],
    ]
    const selected = map.filter(([k]) => form.daysOfCare[k]).map(([, v]) => v)
    return selected.length ? selected.join(", ") : "Not specified"
  }, [form.daysOfCare])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  // Lock body scroll while open (modal scrolls)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset when opening
  useEffect(() => {
    if (open) {
      setForm(initialState)
      setErrors({})
      setSubmitting(false)
      setSubmitted(false)
    }
  }, [open])
  const [emailContent, setEmailContent] = useState("")
  const [copied, setCopied] = useState(false)

  if (!open) return null



  const inputClass = (hasError?: boolean) =>
    [
      "mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none transition",
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-slate-200 focus:border-slate-400",
    ].join(" ")

  const boxClass = (hasError?: boolean) =>
    [
      "rounded-2xl border p-3 transition",
      hasError ? "border-red-500" : "border-slate-200",
    ].join(" ")

  const setField =
    <K extends keyof FormState>(key: K) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value as FormState[K]
        setForm((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => ({ ...prev, [key]: false }))
      }

  const setPreferredContact = (method: ContactMethod) => {
    setForm((prev) => ({ ...prev, preferredContact: method }))
    setErrors((prev) => ({ ...prev, preferredContact: false }))
  }

  const toggleDay = (day: keyof DaysOfCare) => {
    setForm((prev) => ({
      ...prev,
      daysOfCare: { ...prev.daysOfCare, [day]: !prev.daysOfCare[day] },
    }))
  }

  const setAllergiesHas = (val: "no" | "yes") => {
    setForm((prev) => ({
      ...prev,
      allergiesHas: val,
      allergiesExplain: val === "no" ? "" : prev.allergiesExplain,
    }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    // Required: Parent information
    if (!form.parentName.trim()) nextErrors.parentName = true
    if (!form.phoneNumber.trim()) nextErrors.phoneNumber = true
    if (!form.emailAddress.trim()) nextErrors.emailAddress = true
    if (!form.preferredContact) nextErrors.preferredContact = true

    // Required: Child information
    if (!form.childName.trim()) nextErrors.childName = true
    if (!form.childDobOrAge.trim()) nextErrors.childDobOrAge = true
    if (!form.numberOfChildren.trim()) nextErrors.numberOfChildren = true

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleCopy = async () => {
    if (!emailContent) return
    try {
      await navigator.clipboard.writeText(emailContent)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers / some iOS contexts
      const ta = document.createElement("textarea")
      ta.value = emailContent
      ta.setAttribute("readonly", "true")
      ta.style.position = "fixed"
      ta.style.left = "-9999px"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)

      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    // Build email content
    const subject = `Enrollment Inquiry (${tierId}) — ${form.childName}`
    const bodyLines: string[] = [
      `Hello August Daycare,`,
      ``,
      `I’m interested in enrolling my child. Here are our details:`,
      ``,
      `PARENT / GUARDIAN`,
      `Name: ${form.parentName}`,
      `Phone: ${form.phoneNumber}`,
      `Email: ${form.emailAddress}`,
      `Preferred contact: ${form.preferredContact || "Not specified"}`,
      ``,
      `CHILD`,
      `Child name: ${form.childName}`,
      `DOB/Age: ${form.childDobOrAge}`,
      `Number of children needing care: ${form.numberOfChildren}`,
      ``,
      `CARE DETAILS`,
      `Desired start date: ${form.desiredStartDate || "Not specified"}`,
      `Days needed: ${daysLabel}`,
      `Hours needed: ${form.hoursNeeded || "Not specified"}`,
      ``,
      `ADDITIONAL`,
      `Allergies/medical needs: ${form.allergiesHas === "yes"
        ? form.allergiesExplain || "(not provided)"
        : form.allergiesHas === "no"
          ? "No"
          : "Not specified"
      }`,
      `Referral source: ${form.referralSource || "Not specified"}`,
      ``,
      `Questions/comments:`,
      `${form.questionsOrComments?.trim() ? form.questionsOrComments.trim() : "None"}`,
      ``,
      `Thanks!`,
      `${form.parentName}`,
    ]

    const nextEmailContent = bodyLines.join("\n")
    setEmailContent(nextEmailContent)

    const mailtoHref = buildMailto({
      to: TO_EMAIL,
      subject,
      body: nextEmailContent,
    })

    // Update UI first (so when they come back, they see success state)
    setSubmitted(true)

    // IMPORTANT: do NOT await before this on mobile
    window.location.href = mailtoHref

    setSubmitting(false)
  }


  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Modal container (responsive margins + scrollable content) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="relative w-full max-w-3xl px-3 sm:px-6"
        >
          <Card className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl shadow-xl">
            <CardHeader className="shrink-0 space-y-2">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-slate-600">
                Fill this out and submit. You can still download the PDF version below.
              </p>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto px-4 pb-6 pt-4 sm:px-6">
              {submitted ? (
                <div className="rounded-2xl bg-slate-50 p-4 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Check your email app ✉️
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      We’ve opened your default email application with your message pre-filled.
                      Just review it and press send.
                    </p>
                    <p className="mt-3 text-sm text-slate-600">
                      If your email app didn’t open, you can email us directly at{" "}
                      <a
                        href={`mailto:${TO_EMAIL}`}
                        className="text-primary underline"
                      >
                        {TO_EMAIL}
                      </a>
                      .
                    </p>
                  </div>

                  {/* Copyable email content */}
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-1">
                      Email content (you can copy & paste this):
                    </p>

                    <div className="relative">
                      <textarea
                        readOnly
                        value={emailContent}
                        rows={10}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 pr-20 text-xs font-mono text-slate-800"
                        onFocus={(e) => e.currentTarget.select()}
                      />

                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!emailContent}
                        className={[
                          "absolute right-2 top-2 rounded-lg border px-2 py-1 text-[11px] font-semibold transition",
                          "bg-white/90 backdrop-blur",
                          "border-slate-200 text-slate-700 hover:bg-slate-50",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                        ].join(" ")}
                        aria-label="Copy email content to clipboard"
                      >
                        {copied ? "Copied" : "Copy to clipboard"}
                      </button>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Tip: If your email app didn’t open, copy this and paste it into an email.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a href={pdfUrl} download className="w-full">
                      <Button type="button" className="w-full rounded-xl">
                        Download PDF
                      </Button>
                    </a>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-xl"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Parent / Guardian Information */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Parent / Guardian Information{" "}
                      <span className="text-xs font-normal text-slate-500">(required)</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700">
                          Parent/Guardian Full Name{req}
                        </label>
                        <input
                          value={form.parentName}
                          onChange={setField("parentName")}
                          className={inputClass(errors.parentName)}
                          aria-invalid={!!errors.parentName}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Phone Number{req}
                        </label>
                        <input
                          value={form.phoneNumber}
                          onChange={setField("phoneNumber")}
                          className={inputClass(errors.phoneNumber)}
                          aria-invalid={!!errors.phoneNumber}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Email Address{req}
                        </label>
                        <input
                          type="email"
                          value={form.emailAddress}
                          onChange={setField("emailAddress")}
                          className={inputClass(errors.emailAddress)}
                          aria-invalid={!!errors.emailAddress}
                        />
                      </div>
                    </div>

                    <div className={boxClass(errors.preferredContact)}>
                      <p className="text-xs font-semibold text-slate-700">
                        Preferred Method of Contact{req}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm">
                        {(["phone", "text", "email"] as ContactMethod[]).map((m) => (
                          <label key={m} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="preferredContact"
                              checked={form.preferredContact === m}
                              onChange={() => setPreferredContact(m)}
                            />
                            {m.charAt(0).toUpperCase() + m.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Child Information */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Child Information{" "}
                      <span className="text-xs font-normal text-slate-500">(required)</span>
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-700">
                          Child’s Full Name{req}
                        </label>
                        <input
                          value={form.childName}
                          onChange={setField("childName")}
                          className={inputClass(errors.childName)}
                          aria-invalid={!!errors.childName}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Child’s Date of Birth / Age{req}
                        </label>
                        <input
                          value={form.childDobOrAge}
                          onChange={setField("childDobOrAge")}
                          className={inputClass(errors.childDobOrAge)}
                          aria-invalid={!!errors.childDobOrAge}
                          placeholder="e.g., Jan 2023 / 2 years"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Number of children needing care{req}
                        </label>
                        <input
                          inputMode="numeric"
                          value={form.numberOfChildren}
                          onChange={setField("numberOfChildren")}
                          className={inputClass(errors.numberOfChildren)}
                          aria-invalid={!!errors.numberOfChildren}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Care Details */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900">Care Details</h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Desired Start Date
                        </label>
                        <input
                          type="date"
                          value={form.desiredStartDate}
                          onChange={setField("desiredStartDate")}
                          className={inputClass(false)}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Hours Needed
                        </label>
                        <input
                          value={form.hoursNeeded}
                          onChange={setField("hoursNeeded")}
                          className={inputClass(false)}
                          placeholder="6:30 AM – 5:30 PM"
                        />
                      </div>
                    </div>

                    <div className={boxClass(false)}>
                      <p className="text-xs font-semibold text-slate-700">
                        Days of Care Needed (check all that apply)
                      </p>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm sm:grid-cols-5">
                        {(
                          [
                            ["monday", "Monday"],
                            ["tuesday", "Tuesday"],
                            ["wednesday", "Wednesday"],
                            ["thursday", "Thursday"],
                            ["friday", "Friday"],
                          ] as const
                        ).map(([key, label]) => (
                          <label key={key} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={form.daysOfCare[key]}
                              onChange={() => toggleDay(key)}
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Additional Information */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Additional Information
                    </h3>

                    <div className={boxClass(false)}>
                      <p className="text-xs font-semibold text-slate-700">
                        Does your child have any allergies, medical needs, or special considerations?
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="allergiesHas"
                            checked={form.allergiesHas === "no"}
                            onChange={() => setAllergiesHas("no")}
                          />
                          No
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="allergiesHas"
                            checked={form.allergiesHas === "yes"}
                            onChange={() => setAllergiesHas("yes")}
                          />
                          Yes (please explain)
                        </label>
                      </div>

                      {form.allergiesHas === "yes" && (
                        <textarea
                          value={form.allergiesExplain}
                          onChange={setField("allergiesExplain")}
                          rows={3}
                          className={inputClass(false)}
                          placeholder="Explain allergies/medical needs/special considerations..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">
                        How did you hear about our home daycare?
                      </label>
                      <input
                        value={form.referralSource}
                        onChange={setField("referralSource")}
                        className={inputClass(false)}
                        placeholder="Facebook, friend, Google, etc."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700">
                        Any questions or comments?
                      </label>
                      <textarea
                        value={form.questionsOrComments}
                        onChange={setField("questionsOrComments")}
                        rows={3}
                        className={inputClass(false)}
                      />
                    </div>
                  </section>

                  {/* Footer actions */}
                  <div className="rounded-2xl bg-slate-50 p-3 text-[11px] text-slate-600">
                    <span className="text-red-500">*</span> Required fields. You can also download the PDF and email it to{" "}
                    <a
                      href="mailto:august.daycare@outlook.com"
                      className="text-primary underline"
                    >
                      august.daycare@outlook.com
                    </a>
                    .
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <a href={pdfUrl} download className="w-full sm:w-auto">
                      <Button type="button" variant="outline" className="w-full rounded-xl">
                        Download PDF
                      </Button>
                    </a>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={onClose}
                        disabled={submitting}
                      >
                        Cancel
                      </Button>

                      <Button type="submit" className="rounded-xl" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>

                  <input type="hidden" name="tierId" value={tierId} />
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
