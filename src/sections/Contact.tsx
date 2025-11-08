import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
export default function Contact(){
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Visit Us" title="Book a tour or say hello"/>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Send a message</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input placeholder="Your name" required className="w-full rounded-xl border px-3 py-2"/>
                  <input placeholder="Email" type="email" required className="w-full rounded-xl border px-3 py-2"/>
                </div>
                <input placeholder="Phone" className="w-full rounded-xl border px-3 py-2"/>
                <textarea placeholder="How can we help?" rows={5} className="w-full rounded-xl border px-3 py-2"/>
                <Button className="rounded-xl">Submit</Button>
              </form>
            </CardContent>
          </Card>
          <div className="grid content-start gap-4">
            <Card><CardContent className="flex items-center gap-3 p-6"><MapPin className="h-5 w-5 text-primary"/><div><p className="font-semibold">123 Sunshine Ave, Suite 200</p><p className="text-sm text-slate-600">Your City, ST 00000</p></div></CardContent></Card>
            <Card><CardContent className="flex items-center gap-3 p-6"><Clock className="h-5 w-5 text-primary"/><div><p className="font-semibold">Mon–Fri</p><p className="text-sm text-slate-600">7:30am–5:30pm</p></div></CardContent></Card>
            <div className="overflow-hidden rounded-2xl shadow-soft"><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop" alt="Daycare exterior" className="h-64 w-full object-cover"/></div>
          </div>
        </div>
      </Container>
    </section>
  )
}