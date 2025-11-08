import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent } from '@/components/ui/Card'
export default function Testimonials(){
  return (
    <section className="border-b bg-gradient-to-br from-pastel-butter to-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Parent Love" title="What families say"/>
        <div className="grid gap-6 md:grid-cols-3">
          {[1,2,3].map(i => (
            <Card key={i}><CardContent className="p-6">
              <div className="mb-3 flex items-center gap-1">{'★★★★★'}</div>
              <p className="text-base">“Our daughter runs to the door every morning. The teachers are incredible!”</p>
              <p className="mt-3 text-sm text-slate-600">— A happy parent</p>
            </CardContent></Card>
          ))}
        </div>
      </Container>
    </section>
  )
}