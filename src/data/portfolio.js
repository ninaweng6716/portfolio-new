// ─── EDIT THIS FILE TO CUSTOMISE YOUR PORTFOLIO ───────────────────────────

export const info = {
  name:     'Your Name',
  initials: 'YN',
  role:     'Front-End Web Developer',
  location: 'Vancouver, BC',
  email:    'hello@yourname.dev',
  linkedin: 'linkedin.com/in/yourname',
  github:   'github.com/yourname',
  available: true,   // toggles the "Available for work" chip
}

export const skills = ['React', 'TypeScript', 'CSS', 'Figma']

export const about = {
  headline: ['Built on curiosity', 'and clean code.'],
  paragraphs: [
    "I'm a front-end developer who cares about more than just making things work — I care about making things feel right. From smooth interactions to accessible markup, I treat UI as a craft.",
    "I've worked across the full front-end stack, collaborating with designers and back-end teams to ship products that are both technically solid and genuinely delightful to use.",
  ],
  values: [
    { icon: '⚡', text: 'Performance-conscious by default' },
    { icon: '♿', text: 'Accessibility built in, not bolted on' },
    { icon: '🎨', text: 'Respect for the design intent' },
    { icon: '🧩', text: 'Scalable component architecture' },
  ],
}

export const projects = [
  {
    emoji: '🧭',
    bg:    '#EBF9F7',
    name:  'Project One',
    year:  '2024',
    chips: ['React', 'TypeScript', 'CSS Modules'],
    desc:  'A short description of what this project does and the problem it solves. Swap this with your real project details.',
    href:  '#',
  },
  {
    emoji: '🌿',
    bg:    '#F0FDF4',
    name:  'Project Two',
    year:  '2024',
    chips: ['Next.js', 'Tailwind', 'Framer Motion'],
    desc:  'Describe what you built, what was interesting about it technically, and the outcome for the user or client.',
    href:  '#',
  },
  {
    emoji: '🔭',
    bg:    '#EFF6FF',
    name:  'Project Three',
    year:  '2023',
    chips: ['Vue 3', 'GSAP', 'SCSS'],
    desc:  'A third project that rounds out the range of your work — different stack, different domain, same attention to detail.',
    href:  '#',
  },
]
