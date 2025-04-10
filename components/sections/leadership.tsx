import { Mail, Phone, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const leadershipData = [
  {
    name: "Dr. Upendra Dhar",
    role: "Vice Chancellor",
    department: "University Administration",
    image: "/vc.svg?height=300&width=300&text=Dr.+Upinder+Dhar",
    message: "I am proud to support Abhyudaya as they foster innovation and technical excellence among our students.",
    contact: {
      linkedin: "https://www.linkedin.com/in/upinder-dhar-70740416/",
    },
  },
  {
    name: "Dr. Anand Rajawat",
    role: "Director  Professor",
    department: "University Administration",
    image: "/anand-rajawat.jpg",
    message: "Abhyudaya represents the innovative spirit we aim to cultivate in our department.",
    contact: {
      linkedin: "https://www.linkedin.com/in/anand-rajawat-84a5b139/",
    },
  },
  {
    name: "Prof. Avdesh Kumar Sharma",
    role: "Club Coordiantor",
    department: "Computer Science & Engineering",
    image: "/avdhesh-kumar.svg?height=300&width=300&text=Dr.+Rodriguez",
    message: "Working with Abhyudaya students has been one of the most rewarding experiences of my academic career.",
    contact: {
      linkedin: "https://www.linkedin.com/in/avdesh-kumar-sharma-a231152b2/",
    },
  },
  {
    name: "Dr. Kamal Borana",
    role: "Faculty Mentor",
    department: "Computer Science & Engineering",
    image: "/kamal-borana.svg?height=300&width=300&text=Prof.+Kim",
    message: "Abhyudaya provides a platform for students to apply classroom knowledge to real-world problems.",
    contact: {
      linkedin: "https://www.linkedin.com/in/dr-kamal-borana-397aa762/",
    },
  },
]

export default function Leadership() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 select-none">Our Leadership</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto select-none">
          Meet the dedicated faculty and administrators who guide and support our club.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leadershipData.map((leader, index) => (
          <div key={index}>
            <Card className="h-full overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    loading={'lazy'}
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
          </div>
        ))}
      </div>
    </div>
  )
}

