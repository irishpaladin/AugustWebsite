import React from 'react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
export default function Team(){
  const people = [
    {name:'Ms. Jamie', role:'Director', img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop'},
    {name:'Mr. Leo', role:'Lead Preschool', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop'},
    {name:'Ms. Priya', role:'Toddler Teacher', img:'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=900&auto=format&fit=crop'},
    {name:'Ms. Rosa', role:'Infant Teacher', img:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=900&auto=format&fit=crop'},
  ]
  return (
    <section id="team" className="border-b bg-white py-16 md:py-24">
      <Container>
        <SectionTitle kicker="Our Educators" title="Meet the team" subtitle="Experienced, loving, and endlessly creative."/>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map(t => (
            <Card key={t.name} className="overflow-hidden">
              <img src={t.img} alt={t.name} className="h-52 w-full object-cover"/>
              <CardHeader>
                <CardTitle className="text-lg">{t.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">{t.role}</CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}