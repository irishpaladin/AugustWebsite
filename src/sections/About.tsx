import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import Feature from '@/components/shared/Feature'
import { Heart, Apple, ShieldCheck, Baby } from 'lucide-react'
export default function About(){
  return (
    <section id="about" className="border-b bg-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Why Choose Us" title="Nurturing, safe, and play‑based" subtitle="Everything we do is built on love, safety, and discovery."/>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={<Heart className="h-6 w-6" />} title="Warm & Inclusive" desc="Every child is celebrated. We create a welcoming space for all families." />
          <Feature icon={<Apple className="h-6 w-6" />} title="Nutritious Food & Snacks" desc="Healthy, balanced meals and snacks to keep children happy and energized." />
          <Feature icon={<ShieldCheck className="h-6 w-6"/>} title="Safety First" desc="Secure check‑in, sanitized spaces, and CPR‑trained educators."/>
          <Feature icon={<Baby className="h-6 w-6"/>} title="Play‑Based Learning" desc="Curiosity‑driven curriculum aligned with early learning standards."/>
        </div>
      </Container>
    </section>
  )
}