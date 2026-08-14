import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { AboutStory } from './components/AboutStory'
import { Commitment } from './components/Commitment'
import { MeetTeam } from './components/MeetTeam'
import { Footer } from './components/Footer'

export default function AboutApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="About" />
      <main id="main">
        <PageHero
          crumb="About Us"
          eyebrow="About Us"
          title="Built around one idea, not a product shelf."
          lede="Asankhya Capital Management Private Limited was founded to occupy a specific position in Indian alternative investing — a sector-agnostic, multi-asset manager built around a single, disciplined thesis, not a broad shelf of products assembled to suit whichever way the market is moving."
        />
        <AboutStory />
        <Commitment />
        <MeetTeam />
      </main>
      <Footer />
    </>
  )
}
