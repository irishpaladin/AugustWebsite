import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
export default function Pricing(){
  const tiers = [
    {name:'Part‑Time', price:'$599', note:'2 days/week', perks:['8am–5pm','Snacks included','Monthly progress notes'], featured:false},
    {name:'Full‑Time', price:'$999', note:'5 days/week', perks:['7:30am–5:30pm','Healthy lunches','Weekly enrichment'], featured:true},
    {name:'Drop‑In', price:'$85', note:'per day', perks:['Based on availability','Bring lunch','Ages 2+'], featured:false},
  ]
  return (
    <section id="pricing" className="border-b bg-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Tuition" title="Simple, transparent pricing" subtitle="Sibling rate available for enrolled families."/>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map(t => (
            <Card key={t.name} className={`relative ${t.featured? 'ring-2 ring-primary' : ''}`}>
              {t.featured && <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-pastel-rose">Most Popular</span>}
              <CardHeader><CardTitle className="text-xl">{t.name}</CardTitle></CardHeader>
              <CardContent>
                <div className="mb-4 flex items-end gap-1"><span className="text-4xl font-extrabold">{t.price}</span><span className="text-sm text-slate-600">/ mo</span></div>
                <p className="mb-4 text-sm text-slate-600">{t.note}</p>
                <ul className="mb-6 space-y-2 text-sm text-slate-700">{t.perks.map(p=> <li key={p}>• {p}</li>)}</ul>
                <Button className="w-full rounded-xl">Choose {t.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">* Prices are sample placeholders. Update for your center.</p>
      </Container>
    </section>
  )
}
