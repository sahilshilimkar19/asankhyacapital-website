import { Nav } from './components/Nav'
import { PageHero } from './components/PageHero'
import { ContactForm } from './components/ContactForm'
import { ContactStrip } from './components/ContactStrip'
import { Footer } from './components/Footer'

export default function ContactApp() {
  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      {/* Contact is not a nav item — no active link, as the wireframe */}
      <Nav />
      <main id="main">
        <PageHero
          centered
          crumb="Contact"
          eyebrow="Get In Touch"
          title="Start with a conversation, not a sales pitch."
          lede="Tell us a little about your objectives, and a member of our investment team will follow up directly — no obligation, and no fund-specific terms shared until a suitability check is complete."
        />
        <ContactForm />
        <ContactStrip />
      </main>
      <Footer />
    </>
  )
}
