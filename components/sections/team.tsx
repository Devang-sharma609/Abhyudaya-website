"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "President",
    specialization: "AI/ML",
    image: "/placeholder.svg?height=300&width=300&text=Alex",
    social: {
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
      twitter: "https://twitter.com/alexj",
    },
  },
  {
    name: "Priya Patel",
    role: "Vice President",
    specialization: "Web Development",
    image: "/placeholder.svg?height=300&width=300&text=Priya",
    social: {
      github: "https://github.com/priyap",
      linkedin: "https://linkedin.com/in/priyap",
      twitter: "https://twitter.com/priyap",
    },
  },
  {
    name: "Marcus Chen",
    role: "Technical Lead",
    specialization: "Cloud Computing",
    image: "/placeholder.svg?height=300&width=300&text=Marcus",
    social: {
      github: "https://github.com/marcusc",
      linkedin: "https://linkedin.com/in/marcusc",
      twitter: "https://twitter.com/marcusc",
    },
  },
  {
    name: "Sophia Rodriguez",
    role: "Event Coordinator",
    specialization: "UI/UX Design",
    image: "/placeholder.svg?height=300&width=300&text=Sophia",
    social: {
      github: "https://github.com/sophiar",
      linkedin: "https://linkedin.com/in/sophiar",
      twitter: "https://twitter.com/sophiar",
    },
  },
  {
    name: "James Wilson",
    role: "Content Manager",
    specialization: "Cybersecurity",
    image: "/placeholder.svg?height=300&width=300&text=James",
    social: {
      github: "https://github.com/jamesw",
      linkedin: "https://linkedin.com/in/jamesw",
      twitter: "https://twitter.com/jamesw",
    },
  },
  {
    name: "Aisha Khan",
    role: "Outreach Coordinator",
    specialization: "Mobile Development",
    image: "/placeholder.svg?height=300&width=300&text=Aisha",
    social: {
      github: "https://github.com/aishak",
      linkedin: "https://linkedin.com/in/aishak",
      twitter: "https://twitter.com/aishak",
    },
  },
  {
    name: "David Park",
    role: "Treasurer",
    specialization: "Database Management",
    image: "/placeholder.svg?height=300&width=300&text=David",
    social: {
      github: "https://github.com/davidp",
      linkedin: "https://linkedin.com/in/davidp",
      twitter: "https://twitter.com/davidp",
    },
  },
  {
    name: "Emma Thompson",
    role: "Secretary",
    specialization: "Data Science",
    image: "/placeholder.svg?height=300&width=300&text=Emma",
    social: {
      github: "https://github.com/emmat",
      linkedin: "https://linkedin.com/in/emmat",
      twitter: "https://twitter.com/emmat",
    },
  },
]

export default function Team() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the talented students who lead our club and organize our activities.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {teamMembers.map((member, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-base">{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">Specialization: {member.specialization}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-start gap-4">
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

