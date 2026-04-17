import HeroSection     from "../wedding/sections/HeroSection"
import DetailsSection  from "../wedding/sections/DetailsSection"
import ScheduleSection from "../wedding/sections/ScheduleSection"
import RSVPSection     from "../wedding/sections/RSVPSection"
import GallerySection  from "../wedding/sections/GallerySection"

export default function Wedding() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <DetailsSection />
      <ScheduleSection />
      <RSVPSection />
      <GallerySection />
    </div>
  )
}