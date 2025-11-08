import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
export default function Feature({icon, title, desc}:{icon: React.ReactNode, title:string, desc:string}){
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pastel-lavender text-slate-800">{icon}</div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-600">{desc}</CardContent>
    </Card>
  )
}