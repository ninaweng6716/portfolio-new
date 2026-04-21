import AboutImage from "./AboutImage"
import AboutText from "./AboutText"
import AboutGyms from "./AboutGyms"
import { useOutletContext } from "react-router-dom"

export default function About() {
  const { coords } = useOutletContext()

  return (
    <section
      id="about"
      className="py-[12rem] px-[6vw] min-h-dvh flex items-center"
    >
      <div className="w-full flex flex-col gap-20">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-20 items-center">
          <AboutImage />
          <AboutText />
        </div>

        <AboutGyms coords={coords} />

      </div>
    </section>
  )
}