import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { AsankhyaMeaning } from './components/AsankhyaMeaning'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

export default function MeaningApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Nav active="Our Name" />
      <main id="main">
        <PageHero
          crumb="What Does Asankhya Mean"
          eyebrow="Our Values"
          title="What Does Asankhya Mean"
          lede="The Sanskrit idea behind our name."
        />
        <AsankhyaMeaning />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
