"use client"

import { motion } from "framer-motion"
import { Brain, Globe, Cloud, Shield, Smartphone, Cpu, Database, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const domains = [
  {
    title: "AI/ML",
    description: "Explore artificial intelligence and machine learning algorithms to solve complex problems.",
    icon: Brain,
    techStack: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Python"],
  },
  {
    title: "Web Development",
    description: "Build responsive and dynamic web applications using modern frameworks and technologies.",
    icon: Globe,
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Cloud Computing",
    description: "Learn to deploy, scale, and manage applications on leading cloud platforms.",
    icon: Cloud,
    techStack: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
  },
  {
    title: "Cybersecurity",
    description: "Understand security principles and protect systems from vulnerabilities and attacks.",
    icon: Shield,
    techStack: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "OWASP"],
  },
  {
    title: "App Development",
    description: "Create native and cross-platform mobile applications for iOS and Android.",
    icon: Smartphone,
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    title: "IoT",
    description: "Connect physical devices to the internet and build smart systems.",
    icon: Cpu,
    techStack: ["Arduino", "Raspberry Pi", "MQTT", "ESP32", "Node-RED"],
  },
  {
    title: "Database Management",
    description: "Design, implement, and optimize database systems for various applications.",
    icon: Database,
    techStack: ["SQL", "MongoDB", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    title: "Competitive Programming",
    description: "Enhance problem-solving skills through algorithmic challenges and competitions.",
    icon: Code,
    techStack: ["C++", "Java", "Python", "Data Structures", "Algorithms"],
  },
]

export default function Domains() {
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4 select-none">Our Domains</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto select-none">
          Explore our diverse technical domains where you can learn, collaborate, and build innovative projects.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {domains.map((domain, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <domain.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {domain.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">{domain.description}</CardDescription>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.techStack.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

