import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to every element with class "reveal".
 * When they enter the viewport, the class "visible" is added — which CSS
 * transitions opacity and translateY to their final values.
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
