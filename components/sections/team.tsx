"use client"

import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Tanay Nagde",
    role: "President",
    specialization: "AI/ML",
    image: "/Tanay.JPG?height=300&width=300&text=Tanay Nagde",
    social: {
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj",
    },
  },
  {
    name: "Pranjal Birla",
    role: "Vice President",
    specialization: "Web Development",
    image: "/Pranjal.JPG?height=300&width=300&text=Pranjal Birla",
    social: {
      github: "https://github.com/priyap",
      linkedin: "https://linkedin.com/in/priyap",
    },
  },
  {
    name: "Kushagra Rai",
    role: "General Secretary",
    specialization: "Cloud Computing",
    image: "/Kushagra.JPG?height=300&width=300&text=Kushagra Rai",
    social: {
      github: "https://github.com/marcusc",
      linkedin: "https://linkedin.com/in/marcusc",
    },
  },
  {
    name: "Ayush Maddhesiya",
    role: "Technical Secretary",
    specialization: "UI/UX Design",
    image: "/Ayush.JPG?height=300&width=300&text=Ayush Maddhesiya",
    social: {
      github: "https://github.com/sophiar",
      linkedin: "https://linkedin.com/in/sophiar",
    },
  },
  {
    name: "Akash Bais",
    role: "Treasurer",
    specialization: "Mobile Development",
    image: "/Akash.JPG?height=300&width=300&text=Akash Bais",
    social: {
      github: "https://github.com/aishak",
      linkedin: "https://linkedin.com/in/aishak",
    },
  },
  {
    name: "Dhwanil Bhawsar",
    role: "Administrative Secretary",
    specialization: "Database Management",
    image: "/Dhwanil.JPG?height=300&width=300&text=Dhwanil Bhawsar",
    social: {
      github: "https://github.com/davidp",
      linkedin: "https://linkedin.com/in/davidp",
    },
  },
  {
    name: "Nawadha Jadiya",
    role: "Development Lead",
    specialization: "Cybersecurity",
    image: "/Nawadha.JPG?height=300&width=300&text=Nawadha Jadiya",
    social: {
      github: "https://github.com/jamesw",
      linkedin: "https://linkedin.com/in/jamesw",
    },
  },
  {
    name: "Devang Sharma",
    role: "Managing Lead",
    specialization: "Data Science",
    image: "/Devang.JPG",
    social: {
      github: "https://github.com/emmat",
      linkedin: "https://linkedin.com/in/emmat",
    },
  },
  {
    name: "Sneha Yadav",
    role: "Media & Content Lead",
    specialization: "Data Science",
    image: "/Sneha.JPG?height=300&width=300&text=Sneha Yadav",
    social: {
      github: "https://github.com/emmat",
      linkedin: "https://linkedin.com/in/emmat",
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
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

