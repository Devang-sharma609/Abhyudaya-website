"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Tanay Nagde",
    role: "President",
    specialization: "MERN Developer",
    image: "/Tanay.JPG?height=300&width=300&text=Tanay Nagde",
    social: {
      linkedin: "https://www.linkedin.com/in/tanay-nagde-17985b1a6/",
    },
  },
  {
    name: "Pranjal Birla",
    role: "Vice President",
    specialization: "MERN Developer",
    image: "/Pranjal.JPG?height=300&width=300&text=Pranjal Birla",
    social: {
      linkedin: "https://www.linkedin.com/in/pranjal-birla/",
    },
  },
  {
    name: "Kushagra Rai",
    role: "General Secretary",
    specialization: "MERN Developer",
    image: "/Kushagra.JPG?height=300&width=300&text=Kushagra Rai",
    social: {
      linkedin: "https://www.linkedin.com/in/kushagra-raii/",
    },
  },
  {
    name: "Ayush Maddhesiya",
    role: "Technical Secretary",
    specialization: "MERN Developer",
    image: "/Ayush.JPG?height=300&width=300&text=Ayush Maddhesiya",
    social: {
      linkedin: "https://www.linkedin.com/in/ayush-maddhesiya/",
    },
  },
  {
    name: "Akash Bais",
    role: "Treasurer",
    specialization: "Backend Develeopment",
    image: "/Akash.JPG?height=300&width=300&text=Akash Bais",
    social: {
      linkedin: "https://www.linkedin.com/in/bais-akash/",
    },
  },
  {
    name: "Dhwanil Bhavsar",
    role: "Administrative Secretary",
    specialization: "Cinematography and Camera Choreography",
    image: "/Dhwanil.JPG?height=300&width=300&text=Dhwanil Bhavsar",
    social: {
      linkedin: "https://www.linkedin.com/in/dhwanilll/",
    },
  },
  {
    name: "Nawadha Jadiya",
    role: "Development Lead",
    specialization: "Mobile Application Development",
    image: "/Nawadha.JPG?height=300&width=300&text=Nawadha Jadiya",
    social: {
      linkedin: "https://www.linkedin.com/in/nawadha-jadiya-aab426253/",
    },
  },
  {
    name: "Devang Sharma",
    role: "Managing Lead",
    specialization: "Full Stack Development",
    image: "/Devang.JPG",
    social: {
      linkedin: "https://www.linkedin.com/in/devang-sharma609/",
    },
  },
  {
    name: "Sneha Yadav",
    role: "Media & Content Lead",
    specialization: "Cotent Creation and PR Management",
    image: "/Sneha.JPG?height=300&width=300&text=Sneha Yadav",
    social: {
      linkedin: "https://www.linkedin.com/in/sneha-yadav-02909021b/",
    },
  },
]

export default function Team() {
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) {
      controls.start("show")
      setHasAnimated(true)
    }
  }, [controls, hasAnimated])

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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 select-none">Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto select-none">
          Meet the talented students who lead our club and organize our activities.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
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