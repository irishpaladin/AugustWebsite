import React, { useMemo, useState } from "react"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import EnrollmentFormModal from "@/components/shared/EnrollmentFormModal" // <- adjust path if needed
import { FORMS } from "@/constants/strings";

type CarePrices = {
  monthly: string
  sixMonth: string // use "n/a" if not available
}

type CareType = {
  label: "Full-time" | "Part-time"
  schedule: string
  prices: CarePrices
}

type AgeTier = {
  id: "infant" | "toddler" | "preschool"
  label: string
  ages: string
  careTypes: CareType[]
  form: string
  featured?: boolean
}

export default function Fees() {
  const ageTiers: AgeTier[] = useMemo(
    () => [
      {
        id: "infant",
        label: "Infant",
        ages: "0–1.5 years old",
        careTypes: [
          {
            label: "Full-time",
            schedule: "5 days/wk",
            prices: { monthly: "$1,358", sixMonth: "$1,298" },
          },
          {
            label: "Part-time",
            schedule: "3 days/wk",
            prices: { monthly: "$908", sixMonth: "n/a" },
          },
        ],
        form: "/forms/Infant_form.pdf", // dont need this for now
      },
      {
        id: "toddler",
        label: "Toddler",
        ages: "1.6–3 years old",
        careTypes: [
          {
            label: "Full-time",
            schedule: "5 days/wk",
            prices: { monthly: "$1,208", sixMonth: "$1,148" },
          },
          {
            label: "Part-time",
            schedule: "3 days/wk",
            prices: { monthly: "$808", sixMonth: "n/a" },
          },
        ],
        form: "/forms/Toddler_form.pdf", // dont need this for now
      },
      {
        id: "preschool",
        label: "Preschool",
        ages: "3–5 years old",
        careTypes: [
          {
            label: "Full-time",
            schedule: "5 days/wk",
            prices: { monthly: "$1,058", sixMonth: "$1,008" },
          },
          {
            label: "Part-time",
            schedule: "3 days/wk",
            prices: { monthly: "$708", sixMonth: "n/a" },
          },
        ],
        form: "/forms/Preschool_form.pdf", // dont need this for now
        featured: true,
      },
    ],
    []
  )

  const [activeId, setActiveId] = useState<AgeTier["id"]>("toddler")
  const activeTier = ageTiers.find((t) => t.id === activeId) ?? ageTiers[0]

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="fees" className="border-b bg-white py-16 md:py-24">
      <Container>
        <SectionTitle
          kicker="Monthly Fee Schedule"
          title="Simple, transparent fees"
          subtitle="Select an age group to view rates. Click download form to open the enrollment form, fill it out, and submit."
        />

        <div className="mx-auto w-full max-w-[75vw] xl:max-w-5xl">
          <Card className="relative">
            <CardHeader className="space-y-4">
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Age group tabs"
                className="grid w-full grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2"
              >
                {ageTiers.map((tier) => {
                  const isActive = tier.id === activeId
                  return (
                    <button
                      key={tier.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tier.id}`}
                      id={`tab-${tier.id}`}
                      onClick={() => setActiveId(tier.id)}
                      type="button"
                      className={[
                        "w-full rounded-xl text-left transition",
                        "ring-1 ring-transparent",
                        "px-2.5 py-2 sm:px-4 sm:py-3",
                        isActive
                          ? "bg-pastel-lavender shadow-sm ring-2 ring-primary"
                          : "bg-white/60 hover:bg-white hover:ring-slate-200",
                      ].join(" ")}
                    >
                      <p className="text-sm font-semibold text-slate-900">
                        {tier.label}
                      </p>
                      <p className="text-[11px] leading-tight text-slate-600 sm:text-xs">
                        {tier.ages}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Active tier title */}
              <div>
                <CardTitle className="text-2xl">{activeTier.label}</CardTitle>
                <p className="text-sm text-slate-600">{activeTier.ages}</p>
              </div>
            </CardHeader>

            <CardContent
              id={`panel-${activeTier.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTier.id}`}
            >
              {/* Rates */}
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-3 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-700">
                  <div>Care Type</div>
                  <div>Monthly Plan</div>
                  <div>6-Month Plan</div>
                </div>

                <div className="divide-y divide-slate-200">
                  {activeTier.careTypes.map((care) => (
                    <div
                      key={care.label}
                      className="grid grid-cols-3 items-center px-4 py-3 text-sm"
                    >
                      <div className="font-medium text-slate-900">
                        {care.label}{" "}
                        <span className="ml-1 text-xs text-slate-500">
                          ({care.schedule})
                        </span>
                      </div>

                      <div className="font-semibold text-slate-900">
                        {care.prices.monthly}
                      </div>

                      <div
                        className={[
                          "font-semibold",
                          care.prices.sixMonth.toLowerCase() === "n/a"
                            ? "text-slate-400"
                            : "text-slate-900",
                        ].join(" ")}
                      >
                        {care.prices.sixMonth}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop-in note */}
              <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600">
                <span className="font-semibold">Drop-In Care:</span> Drop-in
                rates are prorated from the monthly fee based on the child’s age
                group. Availability is limited and subject to space.
              </p>

              {/* Open Modal */}
              <div className="mt-5">
                <Button
                  type="button"
                  className="w-full rounded-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  Download form
                </Button>

                <p className="mt-2 text-center text-[11px] text-slate-500">
                  After submitting, you can still download the PDF and email it
                  to{" "}
                  <a
                    href="mailto:august.daycare@outlook.com"
                    className="text-primary underline"
                  >
                    august.daycare@outlook.com
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-slate-600">
            * Enrollment is confirmed once we receive your completed form by
            email.
          </p>
        </div>
      </Container>

      {/* Modal */}
      <EnrollmentFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tierId={activeTier.id}
        pdfUrl={FORMS.ENROLLMENT}
      />
    </section>
  )
}
