import React from 'react'
import Container from '@/components/shared/Container'
import { Baby } from 'lucide-react'
import { Button } from '@/components/ui/Button'
export default function Navbar(){
  const links = [
    ["About", "#about"],
    ["Programs","#programs"],
    //["Team","#team"],
    ["Pricing","#pricing"],
    ["FAQ","#faq"],
    ["Contact","#contact"]]
  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2 font-extrabold"><img src="../../public/images/logo.png"
  width={200}
  height={100}/></a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-slate-900">{label}</a>
          ))}
        </nav>
        <a href="#contact"><Button className="rounded-xl">Say hello!</Button></a>
      </Container>
    </div>
  )
}