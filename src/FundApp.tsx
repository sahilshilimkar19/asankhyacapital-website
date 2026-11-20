import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { FundStructure } from './components/FundStructure'
import { FundGovernance } from './components/FundGovernance'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

export default function FundApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Bharat Growth Fund" />
      <main id="main">
        <PageHero
          crumb="Bharat Growth Fund"
          eyebrow="Our Flagship Vehicle"
          title="Asankhya Capital — Bharat Growth Fund"
          lede="A registered SEBI Approved Category III Alternative Investment Fund (IN/AIF3/26-27/2386): a sector-agnostic, multi-asset vehicle investing across listed equities, pre-IPO and anchor allotments, and permitted structured instruments."
        >
          <a href="/philosophy" className="btn btnNavy">
            Read Our Philosophy
          </a>
        </PageHero>
        <FundStructure />
        <FundGovernance />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
