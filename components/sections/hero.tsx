"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight select-none">
              Innovate. <span className="text-primary">Code.</span> Transform.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg select-none">
              Abhyudaya is the premier coding club at our university, dedicated
              to fostering innovation and technical excellence. We bring
              together passionate students from diverse backgrounds to
              collaborate, learn, and build impactful projects that solve
              real-world problems.
            </p>
            <p className="text-lg text-muted-foreground max-w-lg select-none">
              Through workshops, hackathons, and industry collaborations, we
              pr+ovide a platform for students to enhance their coding skills,
              explore emerging technologies, and prepare for successful careers
              in the tech industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="https://chat.whatsapp.com/DVCuoraYRfG8ZGCthTu96s">
                <Button size="lg">Join Our Community</Button>
              </Link>
              <Link href="#projects">
                <Button size="lg" variant="outline">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
