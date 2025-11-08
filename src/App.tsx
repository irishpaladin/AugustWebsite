import React from 'react'
import TopBar from '@/sections/TopBar'
import Navbar from '@/sections/NavBar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Programs from '@/sections/Programs'
import Team from '@/sections/Team'
import Testimonials from '@/sections/Testimonials'
import Pricing from '@/sections/Pricing'
import FAQ from '@/sections/FAQ'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pastel-sky via-white to-pastel-peach">
            <TopBar />
            <Navbar />
            <Hero />
            <About />
            <Programs />
            {/* <Team /> */}
            {/* <Testimonials /> */}
            <Pricing />
            <FAQ />
            <Contact />
            <Footer />
        </div>
    )
}
