import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Container from '@/components/shared/Container'
import SectionTitle from '@/components/shared/SectionTitle'
import { useFetchJson } from '@/hooks/useFetchJson'
import { GalleryImage } from '@/types/gallery'

export default function Gallery() {
  const { data: galleryImagesData } = useFetchJson<GalleryImage[]>('/images-gallery/gallery.json')
  const galleryImages = galleryImagesData ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const totalImages = galleryImages.length

  const activeIndexSafe = totalImages > 0 ? activeIndex % totalImages : 0
  const activeImage = galleryImages[activeIndexSafe]

  useEffect(() => {
    if (totalImages <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalImages)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [totalImages])

  if (totalImages === 0) {
    return null
  }

  const showPrev = () => {
    setActiveIndex((current) => (current - 1 + totalImages) % totalImages)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % totalImages)
  }

  const visibleThumbs = [
    (activeIndexSafe - 1 + totalImages) % totalImages,
    activeIndexSafe,
    (activeIndexSafe + 1) % totalImages,
  ]

  return (
    <section id="gallery" className="border-b bg-white/70 py-16 md:py-24">
      <Container>
        <SectionTitle
          kicker="Gallery"
          title="A glimpse into our daycare"
          subtitle="A simple slideshow of moments from our welcoming learning environment."
        />

        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="relative">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-[420px] w-full rounded-[24px] object-cover sm:h-[520px]"
              />

              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {visibleThumbs.map((index) => {
                const image = galleryImages[index]
                const isActive = index === activeIndex

                return (
                  <button
                    key={`${image.src}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      isActive
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-slate-200 opacity-70 grayscale-[0.35] contrast-90'
                    }`}
                    aria-label={`View ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-24 w-full object-cover sm:h-28"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
