import Link from "next/link"
import { Code, Github, Instagram, Linkedin} from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Abhyudaya</span>
            </div>
            <p className="text-muted-foreground">
              Empowering students to innovate, create, and excel in the world of technology.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/Abhyudaya-SVVV" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/abhyudaya_club" className="text-muted-foreground hover:text-primary transition-colors">
                <FaXTwitter  className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.instagram.com/abhyudayacodingclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==  " className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.linkedin.com/in/abhyudaya-coding-club/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#domains" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Domains
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-muted-foreground hover:text-primary transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p>University Campus,</p>
              <p>Cloud Clomputing Lab-1 &#40;CC-1&#41;</p>
              <a href="mailto:abhyudaya@svvv.edu.in">
              <p className="mt-2">Email: abhyudaya@svvv.edu.in</p>
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Abhyudaya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

