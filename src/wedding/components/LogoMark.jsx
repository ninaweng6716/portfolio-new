import { useState } from "react"

export default function LogoMark({ className }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hearts, setHearts] = useState([])

  const spawnHearts = () => {
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      delay: i * 80,
    }))
    setHearts(h => [...h, ...newHearts])
    setTimeout(() => setHearts([]), 1200)
  }

  const handleClick = () => {
    setClicked(true)
    spawnHearts()
    setTimeout(() => setClicked(false), 400)
  }

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(0.6); }
        }
      `}</style>

      <div
        className="relative inline-flex items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/logo.svg"
          alt="Seal and Fox"
          onClick={handleClick}
          className={[
            className,
            "object-contain transition-all duration-500 cursor-pointer select-none",
            hovered ? "scale-110" : "scale-100",
            clicked ? "scale-95 rotate-3" : "",
          ].join(" ")}
        />

        {hearts.map(({ id, x, delay }) => (
          <span
            key={id}
            aria-hidden="true"
            className="absolute pointer-events-none text-weddingPink text-sm
                       animate-[floatHeart_1s_ease-out_forwards]"
            style={{
              left: `calc(50% + ${x}px)`,
              bottom: "100%",
              animationDelay: `${delay}ms`,
            }}
          >
            ♡
          </span>
        ))}
      </div>
    </>
  )
}