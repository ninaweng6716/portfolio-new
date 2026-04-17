import HeroSection     from "../sections/HeroSection"
import DetailsSection  from "../sections/DetailsSection"
// import ScheduleSection from "../sections/ScheduleSection"
import RSVPSection     from "../sections/RSVPSection"
import GallerySection  from "../sections/GallerySection"

export default function Wedding() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <DetailsSection />
      {/* <ScheduleSection /> */}
      <GallerySection />
      <RSVPSection />
    </div>
  )
}