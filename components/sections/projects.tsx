"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "Bus Management",
    description:
      "An AI-powered study assistant that helps students organize their notes, create flashcards, and prepare for exams.",
    image: "/navgo.png?height=400&width=300&text=Bus+Management",
    techStack: ["SpringBoot", "NEXT.js", "Tailwind", "PostrgreSQL", "Supabase", "React Native"],
    demoUrl: "https://navgo-svvv.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/Bus-Tracking-System",
    featured: true,
  },
  {
    id: 2,
    title: "NoteBin",
    description:
      "A mobile app that connects students on campus, facilitates event discovery, and enables resource sharing.",
    image: "/notebin.png?text=Notebin",
    techStack: ["NEXT.js", "Express", "Node.js"],
    demoUrl: "https://notebin-svvv.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/notebin-svvv",
    featured: true,
  },
  {
    id: 3,
    title: "Inventory Management System",
    description:
      "A virtual laboratory simulator for conducting physics and chemistry experiments in a safe, virtual environment.",
    image: "/placeholder.svg?height=400&width=600&text=Inventory+Management",
    techStack: ["SpringBoot", "Hibernate", "MERN"],
    demoUrl: "https://invento-amber.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/Inventory-Management-System",
    featured: true,
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the innovative projects developed by our club members,
          showcasing their technical skills and creativity.
        </p>
      </div>

      <div className="relative">
        <Button
          variant="link"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 z-10 bg-background/80 hover:bg-background"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous project</span>
        </Button>

        <div className="overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex"
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="min-w-full">
                <Card className="overflow-hidden h-full w-full min-h-[600px]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                    <div className="relative overflow-hidden group lg:col-span-8">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/80 hover:bg-background"
                          asChild
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/80 hover:bg-background"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col lg:col-span-4">
                      <CardHeader className="p-0 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {project.title}
                          </CardTitle>
                          {project.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 flex-grow">
                        <CardDescription className="text-sm mb-4">
                          {project.description}
                        </CardDescription>
                        <div>
                          <h4 className="text-xs font-medium mb-1">
                            Tech Stack:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map((tech, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs py-0"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-0 pt-4 flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Demo
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </a>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        <Button
          variant="link"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 z-10 bg-background/80 hover:bg-background"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next project</span>
        </Button>

        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? "bg-primary" : "bg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
