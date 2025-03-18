import Hero from "@/components/sections/hero"
import Domains from "@/components/sections/domains"
import Events from "@/components/sections/events"
import Projects from "@/components/sections/projects"
import About from "@/components/sections/about"
import Leadership from "@/components/sections/leadership"
import Team from "@/components/sections/team"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import Recruitment from "@/components/sections/recruiting"
import { SHOW_RECRUITMENT } from "@/components/sections/recruiting"


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="recruitment" className="bg-muted/50">
          <Recruitment visible={SHOW_RECRUITMENT} posterSrc="/recruitment.jpg"/>
        </section>
        <section id="domains" className="py-16 bg-muted/50">
          <Domains />
        </section>
        <section id="events" className="py-16">
          <Events />
        </section>
        <section id="projects" className="py-16 bg-muted/50">
          <Projects />
        </section>
        <section id="about" className="py-16">
          <About />
        </section>
        <section id="leadership" className="py-16 bg-muted/50">
          <Leadership />
        </section>
        <section id="team" className="py-16">
          <Team />
        </section>
      </main>
      <Footer />
    </div>
  )
}

