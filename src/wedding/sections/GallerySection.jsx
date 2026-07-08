import { useState, useCallback, useEffect, useRef } from "react"
import { SectionHeader } from "../components/WeddingPrimitives"
import { ChevronLeftIcon, ChevronRightIcon } from "../components/WeddingIcons"

// Dynamically load all photos from public/photos folder
const getPhotosFromFolder = () => {
  // Import all .webp files from public/photos at build time
  const photosModules = import.meta.glob('/public/photos/*.webp', { query: '?url', import: 'default' })
  
  // Extract base filenames and group by original vs thumbnail
  const photos = {}
  const thumbnails = new Set()
  
  Object.keys(photosModules).forEach(path => {
    // Extract filename from path (e.g., "/public/photos/CStudio_0001.webp" -> "CStudio_0001.webp")
    const filename = path.split('/').pop()
    const base = filename.replace(/\.[^/.]+$/, "")
    const ext = filename.match(/\.[^/.]+$/)?.[0] ?? ""
    
    // Check if this is a thumbnail (_400)
    if (base.endsWith('_400')) {
      thumbnails.add(base.replace(/_400$/, ""))
    } else {
      // Store original photos (non-thumbnails)
      if (!photos[base]) {
        photos[base] = { base, ext, hasThumbnail: false }
      }
    }
  })
  
  // Build final photos array with fallback logic
  return Object.values(photos)
    .sort((a, b) => a.base.localeCompare(b.base))
    .map(photo => {
      const hasThumbnail = thumbnails.has(photo.base)
      
      if (!hasThumbnail) {
        console.warn(`⚠️ Missing thumbnail for ${photo.base}${photo.ext} - please add ${photo.base}_400${photo.ext}`)
      }
      
      return {
        label: photo.base,
        src: `/photos/${photo.base}${photo.ext}`,
        thumbSrc: hasThumbnail 
          ? `/photos/${photo.base}_400${photo.ext}`
          : `/photos/${photo.base}${photo.ext}`, // Fallback to full-size
      }
    })
}

const PHOTOS = getPhotosFromFolder()

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
  const [loaded, setLoaded] = useState(false)

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
          srcSet={thumbSrc}
          sizes="(min-width: 768px) 33vw, 50vw"
          alt={label}
          width={400}
          height={400}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={index < 3 ? "high" : "low"}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
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
    if (!isOpen) return

    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousRootHeight = root.style.height
    const previousBodyOverflow = body.style.overflow
    const previousBodyHeight = body.style.height

    root.style.overflow = "hidden"
    root.style.height = "100%"
    body.style.overflow = "hidden"
    body.style.height = "100%"

    return () => {
      root.style.overflow = previousRootOverflow
      root.style.height = previousRootHeight
      body.style.overflow = previousBodyOverflow
      body.style.height = previousBodyHeight
    }
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
      className="fixed inset-0 z-[9999] min-h-[100dvh] bg-black flex flex-col"
    >
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={onClose}
      >
        <span className="font-weddingBody text-white/50 text-[0.65rem] tracking-[0.25rem]">
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
          <ChevronLeftIcon className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-black/30 hover:bg-black/50
                     transition-colors duration-200"
        >
          <ChevronRightIcon className="w-5 h-5 text-white" />
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
  const triggerRef = useRef(null)
  const scrollPositionRef = useRef({ x: 0, y: 0 })

  const handleOpen = useCallback((i) => {
    scrollPositionRef.current = {
      x: window.scrollX ?? window.pageXOffset ?? 0,
      y: window.scrollY ?? window.pageYOffset ?? 0,
    }
    triggerRef.current = document.activeElement
    const img = new Image()
    img.src = PHOTOS[i].src
    setActiveIndex(i)
  }, [])

  const onClose = useCallback(() => {
    setActiveIndex(null)
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPositionRef.current.y,
        left: scrollPositionRef.current.x,
        behavior: "instant",
      })
      triggerRef.current?.focus({ preventScroll: true })
    })
  }, [])

  const onPrev = useCallback(() => setActiveIndex(i => (i - 1 + PHOTOS.length) % PHOTOS.length), [])
  const onNext = useCallback(() => setActiveIndex(i => (i + 1) % PHOTOS.length), [])
  const onJump = useCallback((i) => setActiveIndex(i), [])

  if (PHOTOS.length === 0) return null

  return (
    <section id="gallery" className="bg-white">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader
          heading={<>Our <em className="italic text-weddingPrint">Gallery</em></>}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-8">
          {PHOTOS.map((p, i) => (
            <PhotoCard key={p.label} {...p} index={i} onClick={() => handleOpen(i)} />
          ))}
        </div>

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