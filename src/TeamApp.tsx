import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { TeamGrid } from './components/TeamGrid'
import { Footer } from './components/Footer'

export default function TeamApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Team" />
      <main id="main">
        <PageHero
          crumb="Team"
          eyebrow="Leadership & Team"
          title="An investment committee, not a single name."
          lede="Built to remove single-person dependency from day one — six named roles, each with clear accountability, and a research process any of them can run. Individual names and photographs will be added as the team page is finalised."
        />
        <TeamGrid />
      </main>
      <Footer />
    </>
  )
}
