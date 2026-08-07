import React from 'react'
import Container from '@/components/shared/Container'
import { Baby, Phone, Mail, MapPin, Download } from 'lucide-react'
import { STRINGS } from "@/constants/strings"
import { formatPhone } from '@/utility/FormatPhone'

const handbookDownloadHref = '/forms/August Daycare-Parent Handbook July 2026.pdf'

export default function Footer() {
    return (
        <footer className="border-t bg-white py-12">
            <Container className="grid gap-8 md:grid-cols-4">
                <div>
                    <a href="#home" className="flex items-center gap-2 font-extrabold">
                        <img 
                            src="../../public/images/logo.png"
                            width={200}
                            height={100} 
                        />
                    </a>
                    <p className="mt-3 text-sm text-slate-600">A warm, safe place for children to learn, play, and shine.</p>
                </div>
                <div>
                    <h3 className="mb-3 font-semibold">Programs</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#programs">Infants</a></li>
                        <li><a href="#programs">Toddlers</a></li>
                        <li><a href="#programs">Preschool</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 font-semibold">Center</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#about">About</a></li>
                        {/* <li><a href="#team">Team</a></li> */}
                        <li>
                            <a
                                href={handbookDownloadHref}
                                download
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                <span>Fees</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                                    <Download className="h-3 w-3" />
                                    PDF
                                </span>
                            </a>
                        </li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 font-semibold">Contact</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {formatPhone(STRINGS.CONTACT_NUMBER)} </li>
                        <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {STRINGS.CONTACT_EMAIL}</li>
                        <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {STRINGS.ADDRESS_LINE1}</li>
                    </ul>
                </div>
            </Container>
            <Container className="mt-8 border-t pt-6 text-center text-xs text-slate-600">© {new Date().getFullYear()} {STRINGS.SITE_NAME}. All rights reserved.</Container>
        </footer>
    )
}
