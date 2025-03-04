"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const leadershipData = [
  {
    name: "Dr. Upendra Dhar",
    role: "Vice Chancellor",
    department: "University Administration",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Johnson",
    message: "I am proud to support Abhyudaya as they foster innovation and technical excellence among our students.",
    contact: {
      email: "vc@university.edu",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
  },
  {
    name: "Prof. Michael Chen",
    role: "Head of Department",
    department: "Computer Science & Engineering",
    image: "/placeholder.svg?height=300&width=300&text=Prof.+Chen",
    message: "Abhyudaya represents the innovative spirit we aim to cultivate in our department.",
    contact: {
      email: "hod.cse@university.edu",
      phone: "+1 (555) 234-5678",
      linkedin: "https://linkedin.com/in/michaelchen",
    },
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Faculty Mentor",
    department: "Computer Science & Engineering",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Rodriguez",
    message: "Working with Abhyudaya students has been one of the most rewarding experiences of my academic career.",
    contact: {
      email: "emily.rodriguez@university.edu",
      phone: "+1 (555) 345-6789",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
    },
  },
  {
    name: "Prof. David Kim",
    role: "Club Coordinator",
    department: "Information Technology",
    image: "/placeholder.svg?height=300&width=300&text=Prof.+Kim",
    message: "Abhyudaya provides a platform for students to apply classroom knowledge to real-world problems.",
    contact: {
      email: "david.kim@university.edu",
      phone: "+1 (555) 456-7890",
      linkedin: "https://linkedin.com/in/davidkim",
    },
  },
]

export default function Leadership() {
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the dedicated faculty and administrators who guide and support our club.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {leadershipData.map((leader, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                <div className="sm:col-span-2 p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle>{leader.name}</CardTitle>
                    <CardDescription className="text-base">
                      {leader.role}, {leader.department}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground italic">"{leader.message}"</p>
                  </CardContent>
                  <CardFooter className="p-0 pt-4 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${leader.contact.email}`} className="text-sm hover:underline">
                        {leader.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${leader.contact.phone}`} className="text-sm hover:underline">
                        {leader.contact.phone}
                      </a>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                      <a
                        href={leader.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn Profile</span>
                      </a>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

