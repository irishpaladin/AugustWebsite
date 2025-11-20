import React from 'react'
import Container from '@/components/shared/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Star, ShieldCheck } from 'lucide-react'
export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden border-b bg-gradient-to-br from-pastel-sky to-pastel-peach">
            <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
                <div>
                    <Badge className="mb-4">Family-Owned</Badge>
                    {"   "}
                    <Badge className="mb-4">City-Licensed</Badge>
                    <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">A bright start for little minds</h1>
                    <p className="mt-4 text-lg text-slate-600">Safe, play‑based learning for ages 6 months to 5 years. Flexible full‑time and part‑time programs.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href="#contact"><Button className="rounded-2xl" aria-label="Enroll Now">Enroll Now</Button></a>
                        <a href="#programs"><Button variant="outline" className="rounded-2xl" aria-label="Explore Programs">Explore Programs</Button></a>
                    </div>
                    {/* <div className="mt-6 flex items-center gap-2 text-sm text-slate-600"><Star className="h-4 w-4 fill-current" /> 4.9/5 from local families</div> */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-slate-600"><Star className="h-4 w-4 fill-current" /></div>
                </div>
                <div className="relative">
                    <img src="../../public/images/display-image.jpeg" alt="Kids playing at daycare" className="h-[360px] w-full rounded-3xl object-cover shadow-soft" />
                    <div className="card absolute -bottom-6 -left-6 w-64">
                        <div className="flex items-center gap-3 p-4">
                            <div className="rounded-xl bg-pastel-lavender p-2 text-slate-800"><ShieldCheck className="h-5 w-5" /></div>
                            <div>
                                <p className="text-sm font-semibold">City‑licensed</p>
                                <p className="text-xs text-slate-600">CPR‑trained staff</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}