import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Philosophy } from './components/Philosophy'
import { Rivers } from './components/Rivers'
import { Pillars } from './components/Pillars'
import { FundTeaser } from './components/FundTeaser'
import { Insights } from './components/Insights'
import { TrustStrip } from './components/TrustStrip'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'

export default function App() {
  // CSR renders after the browser's initial fragment-scroll attempt,
  // so deep links like /#fund land at the top without this.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Philosophy />
        <Rivers />
        <Pillars />
        <FundTeaser />
        <Insights />
        <TrustStrip />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
