import { useState, useCallback, useEffect } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"
import PHOTOS from "../data/photos"

function PhotoCard({ label, src, w, h, top, left, rot, zIndex, onClick }) {
  return (
    <>
      {/* Desktop: absolute collage */}
      <button
        onClick={onClick}
        aria-label={`Open photo: ${label}`}
        className="hidden sm:block absolute cursor-pointer overflow-hidden
                   border border-weddingTq-light bg-weddingTq-soft
                   transition-all duration-200 hover:z-50 hover:scale-105
                   focus-visible:outline-2 focus-visible:outline-weddingTq focus-visible:outline-offset-2"
        style={{ width: w, height: h, top, left, transform: `rotate(${rot}deg)`, zIndex }}
      >
        {src ? (
          <img src={src} alt={label} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span aria-hidden="true" className="font-serif italic text-weddingTq text-2xl">✿</span>
          </div>
        )}
      </button>

      {/* Mobile: grid item */}
      <button
        onClick={onClick}
        aria-label={`Open photo: ${label}`}
        className="sm:hidden w-full aspect-square cursor-pointer overflow-hidden
                   border border-weddingTq-light bg-weddingTq-soft
                   transition-all duration-200 active:scale-95
                   focus-visible:outline-2 focus-visible:outline-weddingTq focus-visible:outline-offset-2"
      >
        {src ? (
          <img src={src} alt={label} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span aria-hidden="true" className="font-serif italic text-weddingTq text-2xl">✿</span>
          </div>
        )}
      </button>
    </>
  )
}

function Lightbox({ index, onClose, onPrev, onNext }) {
  const isOpen = index !== null

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape")     onClose()
      if (e.key === "ArrowLeft")  onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  const photo = PHOTOS[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.label}`}
      className="fixed inset-0 z-[9999] bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-weddingBody text-white/50 text-[0.65rem] tracking-[0.2em]">
          {index + 1} / {PHOTOS.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close photo"
          className="w-9 h-9 flex items-center justify-center
                     text-white text-lg rounded-full bg-white/10
                     hover:bg-white/20 transition-colors duration-200
                     focus-visible:outline-2 focus-visible:outline-white"
        >
          ✕
        </button>
      </div>

      {/* Image — fills all remaining vertical space */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.label}
            decoding="async"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 bg-weddingTq-soft p-16">
            <span aria-hidden="true" className="font-serif italic text-weddingTq text-5xl">✿</span>
          </div>
        )}

        {/* Prev — cycles to last */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     text-white text-2xl rounded-full bg-black/30
                     hover:bg-black/50 transition-colors duration-200
                     focus-visible:outline-2 focus-visible:outline-white"
        >
          ‹
        </button>

        {/* Next — cycles to first */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     text-white text-2xl rounded-full bg-black/30
                     hover:bg-black/50 transition-colors duration-200
                     focus-visible:outline-2 focus-visible:outline-white"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div
        className="flex-shrink-0 flex justify-center gap-1.5 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {/* setActiveIndex handled via onPrev/onNext chain — expose setter */}}
            aria-label={`Go to photo ${i + 1}`}
            className={[
              "w-1.5 h-1.5 rounded-full transition-all duration-200",
              i === index ? "bg-white w-3" : "bg-white/30",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  )
}

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const collageHeight = Math.max(...PHOTOS.map(p => p.top + p.h)) + 24

  const onClose = useCallback(() => setActiveIndex(null), [])
  // Wrap around: prev from 0 → last, next from last → 0
  const onPrev  = useCallback(() => setActiveIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const onNext  = useCallback(() => setActiveIndex(i => (i + 1) % PHOTOS.length), [])

  return (
    <section id="gallery" className="bg-white">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader
          label="Memories"
          heading={<>Our <em className="italic text-weddingPrint">Gallery</em></>}
        />

        {/* Mobile: 2-col grid */}
        <div className="sm:hidden grid grid-cols-2 gap-2 mt-8">
          {PHOTOS.map((p, i) => (
            <PhotoCard key={p.label} {...p} zIndex={i + 1} onClick={() => setActiveIndex(i)} />
          ))}
        </div>

        {/* Desktop: absolute collage */}
        <div className="relative mt-8 hidden sm:block" style={{ height: collageHeight }}>
          {PHOTOS.map((p, i) => (
            <PhotoCard key={p.label} {...p} zIndex={i + 1} onClick={() => setActiveIndex(i)} />
          ))}
        </div>
      </div>

      <Lightbox
        index={activeIndex}
        onClose={onClose}
        onPrev={onPrev}
        onNext={onNext}
        setActiveIndex={setActiveIndex}
      />
    </section>
  )
}