import React from "react"
import Container from "@/components/shared/Container"
import SectionTitle from "@/components/shared/SectionTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

type PlanRate = {
  name: string
  price: string
  note: string
}

type AgeTier = {
  id: string
  label: string
  ages: string
  rates: PlanRate[]
  form: string
  featured?: boolean
}

export default function Pricing() {
  const ageTiers: AgeTier[] = [
    {
      id: "infant",
      label: "Infant",
      ages: "6–18 months",
      rates: [
        { name: "6-Month Plan", price: "$1,350", note: "6-month subscription" },
        { name: "Monthly Plan", price: "$1,450", note: "Month-to-month" },
      ],
      form: "/forms/Infant_form.pdf",
      featured: true,
    },
    {
      id: "toddler",
      label: "Toddler",
      ages: "18–36 months",
      rates: [
        { name: "6-Month Plan", price: "$1,250", note: "6-month subscription" },
        { name: "Monthly Plan", price: "$1,350", note: "Month-to-month" },
      ],
      form: "/forms/Toddler_form.pdf",
    },
    {
      id: "preschool",
      label: "Preschool",
      ages: "3–5 years",
      rates: [
        { name: "6-Month Plan", price: "$1,150", note: "6-month subscription" },
        { name: "Monthly Plan", price: "$1,250", note: "Month-to-month" },
      ],
      form: "/forms/Preschool_form.pdf",
    },
  ]

  return (
    <section id="pricing" className="border-b bg-white py-16 md:py-24">
      <Container>
        <SectionTitle
          kicker="Tuition"
          title="Simple, transparent pricing"
          subtitle="Download the enrollment form for your child’s age group, fill it out, and email it back to us."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {ageTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative transition-shadow ${
                tier.featured ? "ring-2 ring-primary shadow-lg" : ""
              }`}
            >
              {tier.featured && (
                <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-pastel-rose">
                  Most Popular
                </span>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{tier.label}</CardTitle>
                <p className="text-sm text-slate-600">{tier.ages}</p>
              </CardHeader>

              <CardContent>
                <div className="mb-4 space-y-3 text-sm">
                  {tier.rates.map((rate) => (
                    <div
                      key={rate.name}
                      className="flex items-baseline justify-between rounded-xl bg-slate-50 px-3 py-2"
                    >
                      <div>
                        <p className="font-medium">{rate.name}</p>
                        <p className="text-xs text-slate-500">{rate.note}</p>
                      </div>
                      <p className="text-base font-semibold text-slate-800">
                        {rate.price}
                      </p>
                    </div>
                  ))}
                </div>

                <a href={tier.form} download>
                  <Button type="button" className="w-full rounded-xl">
                    Download {tier.label.toLowerCase()} form
                  </Button>
                </a>

                <p className="mt-2 text-center text-[11px] text-slate-500">
                  After filling out the form, please email it to{" "}
                  <a
                    href="mailto:august.daycare@outlook.com"
                    className="text-primary underline"
                  >
                    august.daycare@outlook.com
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          * Enrollment is confirmed once we receive your completed form by email.
        </p>
      </Container>
    </section>
  )
}
