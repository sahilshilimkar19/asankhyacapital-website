import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { ResearchGrid } from './components/ResearchGrid'
import { SubscribeBand } from './components/SubscribeBand'
import { Footer } from './components/Footer'

export default function ResearchApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Insights" />
      <main id="main">
        <PageHero
          crumb="Research & Insights"
          eyebrow="Research & Insights"
          title="Thought Leadership"
          lede="Our published research, market commentary, and the thinking behind the SCALE framework — updated on the cadence set out in our brand visibility calendar, not a reactive news cycle."
        />
        <ResearchGrid />
        <SubscribeBand />
      </main>
      <Footer />
    </>
  )
}
