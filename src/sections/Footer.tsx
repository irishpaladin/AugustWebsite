import React from 'react'
import Container from '@/components/shared/Container'
import { Baby, Phone, Mail, MapPin } from 'lucide-react'
export default function Footer() {
    return (
        <footer className="border-t bg-white py-12">
            <Container className="grid gap-8 md:grid-cols-4">
                <div>
                    <a href="#home" className="flex items-center gap-2 font-extrabold"><Baby className="h-5 w-5 text-primary" /> Little Lumens</a>
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
                        <li><a href="#team">Team</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 font-semibold">Contact</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (234) 555-6789</li>
                        <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@littlelumens.com</li>
                        <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Sunshine Ave</li>
                    </ul>
                </div>
            </Container>
            <Container className="mt-8 border-t pt-6 text-center text-xs text-slate-600">© {new Date().getFullYear()} Little Lumens Daycare. All rights reserved.</Container>
        </footer>
    )
}
