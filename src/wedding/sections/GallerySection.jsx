import { useState, useCallback, useEffect, useRef } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"

const PHOTO_FILENAMES = [
  'CStudio_0001.webp',
  'CStudio_0018.webp',
  'CStudio_0051.webp',
  'CStudio_0077.webp',
  'CStudio_0085.webp',
  'CStudio_0184.webp',
  'CStudio_0206.webp',
  'CStudio_0214.webp',
  'CStudio_0237.webp',
  'CStudio_0248.webp',
  'CStudio_0251.webp',
  'CStudio_0266.webp',
]

const PHOTOS = PHOTO_FILENAMES.map(filename => {
  const base = filename.replace(/\.[^/.]+$/, "")
  const ext  = filename.match(/\.[^/.]+$/)?.[0] ?? ""
  return {
    label:    base,
    src:      `/photos/${filename}`,
    thumbSrc: `/photos/${base}_400${ext}`,
  }
})

const SWIPE_THRESHOLD = 50

function useSwipe(onSwipeLeft, onSwipeRight) {
  const touchStartX  = useRef(null)
  const touchStartY  = useRef(null)
  const isSwiping    = useRef(false)
  const isMultiTouch = useRef(false)

  const onTouchStart = useCallback((e) => {
    if (e.touches.length > 1) { isMultiTouch.current = true; return }
    isMultiTouch.current = false
    isSwiping.current    = false
    touchStartX.current  = e.touches[0].clientX
    touchStartY.current  = e.touches[0].clientY
  }, [])

  const onTouchMove = useCallback((e) => {
    if (isMultiTouch.current || touchStartX.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) isSwiping.current = true
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (isMultiTouch.current) { isMultiTouch.current = false; touchStartX.current = null; return }
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      dx < 0 ? onSwipeLeft() : onSwipeRight()
    }
    touchStartX.current = null
    isSwiping.current   = false
  }, [onSwipeLeft, onSwipeRight])

  const onClickCapture = useCallback((e) => {
    if (isMultiTouch.current || isSwiping.current) e.stopPropagation()
  }, [])

  return { onTouchStart, onTouchMove, onTouchEnd, onClickCapture }
}

function PhotoCard({ label, src, thumbSrc, onClick, index }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open photo: ${label}`}
      className="w-full aspect-square cursor-pointer overflow-hidden
                 border border-weddingTq-light bg-weddingTq-soft
                 transition-transform duration-200 hover:scale-105 active:scale-95
                 will-change-transform transform-gpu
                 focus-visible:outline-2 focus-visible:outline-weddingTq focus-visible:outline-offset-2"
    >
      {src ? (
        <img
          src={thumbSrc}
          srcSet={`${thumbSrc} 400w, ${src} 1600w`}
          sizes="(min-width: 768px) 33vw, 50vw"
          alt={label}
          width={400}
          height={400}
          loading="eager"
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span aria-hidden="true" className="font-serif italic text-weddingTq text-2xl">✿</span>
        </div>
      )}
    </button>
  )
}

function Lightbox({ index, onClose, onPrev, onNext, onJump }) {
  const isOpen    = index !== null
  const swipe     = useSwipe(onNext, onPrev)
  const [imgLoaded, setImgLoaded] = useState(false)

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

  useEffect(() => {
    if (index === null) return
    setImgLoaded(false)
    const preload = (i) => { const img = new Image(); img.src = PHOTOS[(i + PHOTOS.length) % PHOTOS.length].src }
    preload(index + 1)
    preload(index - 1)
  }, [index])

  if (!isOpen || PHOTOS.length === 0) return null

  const photo = PHOTOS[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.label}`}
      className="fixed inset-0 z-[9999] bg-black flex flex-col"
    >
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={onClose}
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

      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden"
        onTouchStart={swipe.onTouchStart}
        onTouchMove={swipe.onTouchMove}
        onTouchEnd={swipe.onTouchEnd}
        onClickCapture={swipe.onClickCapture}
      >
        {photo.src ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
              </div>
            )}
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.label}
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-contain pointer-events-none select-none transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 bg-weddingTq-soft p-16">
            <span aria-hidden="true" className="font-serif italic text-weddingTq text-5xl">✿</span>
          </div>
        )}

        <button
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-black/30 hover:bg-black/50
                     transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L7 10L12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-black/30 hover:bg-black/50
                     transition-colors duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5L13 10L8 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-shrink-0 flex justify-center gap-1.5 py-4">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === index ? "bg-white w-3" : "bg-white/30 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [allLoaded, setAllLoaded]     = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    let count = 0
    const total = PHOTOS.length

    PHOTOS.forEach(p => {
      const img = new Image()
      const done = () => {
        count++
        if (count >= total) setAllLoaded(true)
      }
      img.onload  = done
      img.onerror = done
      img.src = p.thumbSrc
    })
  }, [])

  const handleOpen = useCallback((i) => {
    triggerRef.current = document.activeElement
    const img = new Image()
    img.src = PHOTOS[i].src
    setActiveIndex(i)
  }, [])

  const onClose = useCallback(() => {
    setActiveIndex(null)
    triggerRef.current?.focus()
  }, [])

  const onPrev = useCallback(() => setActiveIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const onNext = useCallback(() => setActiveIndex(i => (i + 1) % PHOTOS.length), [])
  const onJump = useCallback((i) => setActiveIndex(i), [])

  if (PHOTOS.length === 0) return null

  return (
    <section id="gallery" className="bg-white">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader
          label="Memories"
          heading={<>Our <em className="italic text-weddingPrint">Gallery</em></>}
        />

        {!allLoaded ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-8 py-24">
            <div className="w-8 h-8 rounded-full border-2 border-weddingTq-light border-t-weddingTq animate-spin" />
            <p className="font-weddingBody text-[0.65rem] tracking-[0.2em] uppercase text-weddingPrint/40">
              Loading photos…
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-8 animate-fadeIn">
            {PHOTOS.map((p, i) => (
              <PhotoCard key={p.label} {...p} index={i} onClick={() => handleOpen(i)} />
            ))}
          </div>
        )}

        <p className="mt-6 text-center font-weddingBody text-[0.65rem] tracking-[0.25em] uppercase text-weddingPrint/40">
          Photography by{" "}
          <a
            href="https://www.instagram.com/charliephoto.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-weddingTq border-b border-weddingTq/30
                       transition-colors duration-200 hover:text-weddingTq-dim hover:border-weddingTq"
          >
            @charliephoto.ca
          </a>
        </p>
      </div>

      <Lightbox index={activeIndex} onClose={onClose} onPrev={onPrev} onNext={onNext} onJump={onJump} />
    </section>
  )
}