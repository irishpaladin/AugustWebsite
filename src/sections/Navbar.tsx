import React from 'react'
import Container from '@/components/shared/Container'
import { Baby, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FORMS } from "@/constants/strings";

export default function Navbar() {
  const links: [string, string][] = [
    ['About', '#about'],
    ['Programs', '#programs'],
    ['Pricing', '#pricing'],
    ['FAQ', '#faq'],
    ['Contact', '#contact'],
  ]

  const formLinks = [
    { label: 'Infant enrollment form', href: FORMS.INFANT_ENROLLMENT },
    { label: 'Toddler and Preschool enrollment form', href: FORMS.TODDLER_AND_PRESCHOOL_ENROLLMENT },
    { label: 'Excursion & transportation consent', href: FORMS.EXCURSION_AND_TRANSPORTATION,
    },
    { label: 'Medical form', href: FORMS.MEDICATION_FORM },
  ]

  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2 font-extrabold">
          <img src="../../public/images/logo.png" width={200} height={100} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {label}
            </a>
          ))}

          {/* Forms dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <Baby className="h-4 w-4" />
              <span>Forms</span>
            </button>

            {/* Dropdown panel – attached directly under the button */}
            <div
              className="
                absolute right-0 top-full z-20
                w-72 rounded-xl border bg-white shadow-lg p-3
                opacity-0 invisible pointer-events-none
                group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                transition-opacity duration-150
              "
            >
              <p className="mb-2 text-xs font-semibold text-slate-500">
                Download enrollment & consent forms
              </p>
              <ul className="space-y-1 text-sm text-slate-700">
                {formLinks.map((form) => (
                  <li key={form.label}>
                    <a
                      href={form.href}
                      download
                      className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50"
                    >
                      <span>{form.label}</span>
                      <FileText className="h-4 w-4 text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <a href="#contact">
          <Button className="rounded-xl">Say hello!</Button>
        </a>
      </Container>
    </div>
  )
}
