import { SectionHeader, TimelineItem, TimelineEntry } from "../components/WeddingPrimitives"

const SCHEDULE = [
  { time: "2:45 PM",  event: "Guests Seated",   desc: "Welcome with string quartet",      side: "left"  },
  { time: "3:00 PM",  event: "Ceremony Begins",  desc: "Dr. Sun Yat-Sen Garden",           side: "right" },
  { time: "3:45 PM",  event: "Cocktail Hour",    desc: "Garden terrace, drinks & canapés", side: "left"  },
  { time: "5:00 PM",  event: "Reception Opens",  desc: "Dinner, toasts & first dances",    side: "right" },
  { time: "9:00 PM",  event: "Cake & Dancing",   desc: "Live band takes the floor",         side: "left"  },
  { time: "Midnight", event: "Farewell",          desc: "Sparkler send-off",                side: "right" },
]

export default function ScheduleSection() {
  return (
    <section id="schedule" className="bg-white">
      <div className="max-w-3xl mx-auto px-8 py-20">
        <SectionHeader label="The day of" heading={<>Day <em className="italic text-[#9e7b7b]">Schedule</em></>} />

        {/* Centre line */}
        <div className="relative mt-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#e8d8b4] -translate-x-1/2" />
          {SCHEDULE.map(({ time, event, desc, side }) => {
            const entry = <TimelineEntry time={time} event={event} desc={desc} />
            return (
              <TimelineItem
                key={time}
                left={side === "left" ? entry : null}
                right={side === "right" ? entry : null}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
