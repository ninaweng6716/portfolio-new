import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    )

    const observe = (root = document) =>
      root.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))

    observe()

    const mutation = new MutationObserver(() => observe())
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])
}