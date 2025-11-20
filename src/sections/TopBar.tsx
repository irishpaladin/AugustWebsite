import React from 'react'
import Container from '@/components/shared/Container'
import { Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react'
import { STRINGS } from "@/constants/strings";
import { formatPhone } from '@/utility/FormatPhone';
export default function TopBar(){
  return (
    <div className="border-b bg-white/70 backdrop-blur">
      <Container className="flex items-center justify-between py-2 text-sm">
        <div className="flex items-center gap-4">
          <a href="tel:+12345556789" className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900"><Phone className="h-4 w-4"/> {formatPhone(STRINGS.CONTACT_NUMBER)}</a>
          <a href="mailto:hello@littlelumens.com" className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900"><Mail className="h-4 w-4"/> {STRINGS.CONTACT_EMAIL}</a>
        </div>
        <div className="hidden items-center gap-3 md:flex text-slate-600">
          <a href={STRINGS.FACEBOOK}><Facebook className="h-4 w-4"/></a>
          <a href={STRINGS.INSTAGRAM}><Instagram className="h-4 w-4"/></a>
          <a href="#contact"><MessageCircle className="h-4 w-4"/></a>
        </div>
      </Container>
    </div>
  )
}