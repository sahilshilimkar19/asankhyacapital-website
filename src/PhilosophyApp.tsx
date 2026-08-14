import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { SangamRivers } from './components/SangamRivers'
import { PhilosophyPillars } from './components/PhilosophyPillars'
import { ReadNext } from './components/ReadNext'
import { Footer } from './components/Footer'

export default function PhilosophyApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Philosophy" />
      <main id="main">
        <PageHero
          crumb="Investment Philosophy"
          eyebrow="Investment Philosophy"
          title="The Sangam Philosophy"
          lede={
            '"We invest in businesses with enduring competitive advantages operating at the intersection of India\'s structural growth and exceptional execution." Three rivers meeting at a confluence — Sangam — is the oldest metaphor in Indian geography for exactly this idea, and it is the one we have built our entire research process around.'
          }
        />
        <SangamRivers />
        <PhilosophyPillars />
        <ReadNext />
      </main>
      <Footer />
    </>
  )
}
