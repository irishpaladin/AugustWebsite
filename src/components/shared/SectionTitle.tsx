import React from 'react'
import { Badge } from '@/components/ui/Badge'
export default function SectionTitle({kicker, title, subtitle}:{kicker?: string, title: string, subtitle?: string}){
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {kicker && <Badge className="mb-3">{kicker}</Badge>}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
    </div>
  )
}