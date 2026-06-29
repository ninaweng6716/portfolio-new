export default function WeddingCard({ title, children, className = "", wide = false, titleClassName = "" }) {
  return (
    <div className={[
      "flex flex-col self-stretch overflow-hidden",
      "bg-white border border-weddingTq-light",
      "transition-all duration-500",
      wide ? "col-span-2 max-sm:col-span-1" : "h-full",
      className,
    ].filter(Boolean).join(" ")}>
      <div className="h-1 w-full flex-shrink-0 bg-weddingTq" />

      <div className="flex flex-1 flex-col p-8 gap-4">
        {title && (
          <h3 className={["wedding-h3", titleClassName].filter(Boolean).join(" ")}>
            {title}
          </h3>
        )}

        {children}
      </div>
    </div>
  )
}
