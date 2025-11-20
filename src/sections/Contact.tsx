import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ContactForm from '@/components/shared/ContactForm'
import { STRINGS } from "@/constants/strings"
export default function Contact(){
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Contact Us" title="Say hello — we’re happy to chat"/>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Send a message</CardTitle></CardHeader>
            <ContactForm toEmail="august.daycare@outlook.com" />
          </Card>
          <div className="grid content-start gap-4">
            <Card><CardContent className="flex items-center gap-3 pt-6 pb-6"><MapPin className="h-5 w-5 text-primary"/><div><p className="font-semibold">{STRINGS.ADDRESS_LINE1}</p><p className="text-sm text-slate-600">{STRINGS.ADDRESS_LINE2}</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-3 pt-6 pb-6"><Clock className="h-5 w-5 text-primary"/><div><p className="font-semibold">{STRINGS.OPEN_DAYS}</p><p className="text-sm text-slate-600">{STRINGS.OPEN_TIME}</p></div></CardContent></Card>
            <div className="overflow-hidden rounded-2xl shadow-soft"><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop" alt="Daycare exterior" className="h-64 w-full object-cover"/></div>
          </div>
        </div>
      </Container>
    </section>
  )
}