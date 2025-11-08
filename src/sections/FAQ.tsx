import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Accordion } from '@/components/ui/Accordion'
export default function FAQ(){
  return (
    <section id="faq" className="border-b bg-gradient-to-br from-white to-pastel-butter py-16 md:py-24">
      <Container>
        <SectionTitle kicker="FAQ" title="You’ve got questions" subtitle="If you don’t see your question here, contact us any time."/>
        <Accordion items={[
          {q:'What are your hours?', a:'We’re open Monday–Friday, 7:30am–5:30pm. Extended hours available by request.'},
          {q:'How do you handle allergies?', a:'We maintain strict allergy‑aware protocols and work closely with families on individual plans.'},
        ]}/>
      </Container>
    </section>
  )
}