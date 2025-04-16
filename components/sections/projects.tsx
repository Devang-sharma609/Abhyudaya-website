"use client";

import { useState, useRef, useEffect, TouchEvent } from "react";
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
      "A Bus Management System that helps students track their college buses in real time, ensuring timely arrivals and hassle-free commuting.",
    image: "/Bus_Img.png?height=400&width=600&text-Bus+Management",
    techStack: ["SpringBoot", "NEXT.js", "Tailwind", "PostrgreSQL", "Supabase", "React Native"],
    demoUrl: "https://navgo-svvvbus.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/Bus-Tracking-System",
    featured: true,
  },
  {
    id: 2,
    title: "NoteBin",
    description:
      "A College Notes Hub where students can upload, share, and access study materials easily, making learning more collaborative and efficient.",
    image: "/Notebin_Img.png?height=400&width=600&text=Notebin",
    techStack: ["NEXT.js", "Express", "Node.js"],
    demoUrl: "https://notebin-svvv.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/notebin-svvv",
    featured: true,
  },
  {
    id: 3,
    title: "Inventory Management System",
    description:
      "An Inventory Management System that streamlines stock tracking, reduces shortages, and optimizes inventory control for seamless business operations.",
    image: "/SvvvInvento-Img.png?height=400&width=600&text=Inventory+Management",
    techStack: ["SpringBoot", "Hibernate", "MERN"],
    demoUrl: "https://invento-amber.vercel.app/",
    githubUrl: "https://github.com/Abhyudaya-SVVV/Inventory-Management-System",
    featured: true,
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  return (
    <div className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900" id="projects">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">Our Projects</h2>
        
        <div className="relative overflow-hidden mx-auto max-w-6xl">
          <div
            ref={containerRef}
            className="carousel-container relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex md:hidden justify-center mb-4">
              <span className="text-sm text-muted-foreground">
                Swipe to browse projects ({currentIndex + 1}/{projects.length})
              </span>
            </div>
            
            <motion.div
              className={`carousel-track flex ${isSwiping ? 'transition-none' : 'transition-transform duration-300'}`}
              initial={false}
              animate={{ x: `-${currentIndex * 100}%` }}
            >
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="carousel-card min-w-full md:min-h-[500px] flex flex-col swipe-hint-left swipe-hint-right"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-wrap gap-3 pt-0">
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>View Demo</span>
                        </a>
                      </Button>
                    )}
                    
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Github className="h-4 w-4" />
                          <span>Source Code</span>
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </div>
          
          <div className="hidden md:flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous project</span>
            </Button>
            
            {projects.map((_, i) => (
              <Button
                key={i}
                variant={i === currentIndex ? "default" : "outline"}
                size="sm"
                className="w-4 h-4 rounded-full mt-3"
                onClick={() => setCurrentIndex(i)}
              >
                <span className="sr-only">Go to project {i + 1}</span>
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
