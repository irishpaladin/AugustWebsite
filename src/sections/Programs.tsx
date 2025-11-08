import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
export default function Programs(){
  const list = [
    { name:'Infants', age:'6–18 months', img:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop', points:['Warm, responsive care','Individual sleep & feeding plans','Sensory play & music']},
    { name:'Toddlers', age:'18–36 months', img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop', points:['Language bursts & songs','Outdoor time daily','Potty‑learning support']},
    { name:'Preschool', age:'3–5 years', img:'https://images.unsplash.com/photo-1596495578065-8aa9c47c2c07?q=80&w=1200&auto=format&fit=crop', points:['Kindergarten readiness','STEM + art centers','Social‑emotional skills']},
  ]
  return (
    <section id="programs" className="border-b bg-gradient-to-br from-white to-pastel-sky py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Programs" title="Growing through each stage" subtitle="Small ratios, tailored activities, and lots of joyful play."/>
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((p)=> (
            <Card key={p.name} className="overflow-hidden">
              <img src={p.img} alt={p.name} className="h-44 w-full object-cover"/>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="badge bg-pastel-mint">{p.age}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  {p.points.map(pt => <li key={pt} className="flex items-center gap-2">• {pt}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}