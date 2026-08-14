import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { FundStructure } from './components/FundStructure'
import { FundGovernance } from './components/FundGovernance'
import { Footer } from './components/Footer'

export default function FundApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Bharat Fund" />
      <main id="main">
        <PageHero
          crumb="Bharat Fund"
          eyebrow="Our Flagship Vehicle"
          title="Asankhya Capital — Bharat Fund"
          lede="A proposed SEBI-registered Category III Alternative Investment Fund: a sector-agnostic, multi-asset vehicle investing across listed equities, pre-IPO and anchor allotments, and permitted structured instruments."
        >
          <a href="/philosophy" className="btn btnNavy">
            Read Our Philosophy
          </a>
        </PageHero>
        <FundStructure />
        <FundGovernance />
      </main>
      <Footer />
    </>
  )
}
