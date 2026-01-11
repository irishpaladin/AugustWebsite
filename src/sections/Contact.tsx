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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* LEFT COLUMN */}
  <div className="flex flex-col gap-4 h-full">

    {/* ADDRESS CARD */}
    <Card className="flex-1">
      <CardContent className="h-full flex flex-col justify-between p-8 pt-8 bg-pastel-sky/20 rounded-xl">

        {/* Header / Icon */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-semibold text-lg">Our Location</h4>
        </div>

        {/* Center content */}
        <div className="flex-1 flex items-center">
          <div>
            <p className="font-semibold text-lg">{STRINGS.ADDRESS_LINE1}</p>
            <p className="text-sm text-slate-600">{STRINGS.ADDRESS_LINE2}</p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="w-full h-1 rounded-full bg-primary/20" />
      </CardContent>
    </Card>

    {/* HOURS CARD */}
    <Card className="flex-1">
      <CardContent className="h-full flex flex-col justify-between p-8 pt-8 bg-pastel-peach/20 rounded-xl">

        {/* Header / Icon */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-semibold text-lg">Open Hours</h4>
        </div>

        {/* Center content */}
        <div className="flex-1 flex items-center">
          <div>
            <p className="font-semibold text-lg">{STRINGS.OPEN_DAYS}</p>
            <p className="text-sm text-slate-600">{STRINGS.OPEN_TIME}</p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="w-full h-1 rounded-full bg-primary/20" />
      </CardContent>
    </Card>

  </div>

  {/* RIGHT COLUMN — Portrait image/video */}
  <div className="overflow-hidden rounded-2xl shadow-soft h-[400px]">
    <video
      src="../../../public/images/address.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
    />
  </div>

</div>
        </div>
      </Container>
    </section>
  )
}