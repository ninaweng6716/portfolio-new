import HeroSection     from "../sections/HeroSection"
import DetailsSection  from "../sections/DetailsSection"
import RSVPSection     from "../sections/RSVPSection"
import GallerySection  from "../sections/GallerySection"
import FAQSection      from "../sections/FAQSection"

export default function Wedding() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <DetailsSection />
      <GallerySection />
      <RSVPSection />
      <FAQSection />
    </div>
  )
}