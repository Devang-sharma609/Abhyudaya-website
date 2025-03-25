"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] mx-auto"
        >
          <img
            src="/Club.JPG?&text=Club+Team"
            alt="College Campus"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 md:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left select-none">About Abhyudaya</h2>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xl font-semibold select-none">Our Vision</h3>
            <p className="text-muted-foreground select-none">
              To create a vibrant community of tech enthusiasts who collaborate, innovate, and develop solutions that
              make a positive impact on society.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xl font-semibold select-none">Our Mission</h3>
            <p className="text-muted-foreground select-none">
              Abhyudaya is dedicated to fostering technical excellence and innovation among students through hands-on
              learning experiences, industry collaborations, and community-driven projects.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xl font-semibold select-none">What We Do</h3>
            <ul className="space-y-1 md:space-y-2 text-muted-foreground list-disc pl-5 select-none">
              <li>Organize workshops, hackathons, and coding competitions</li>
              <li>Facilitate industry connections and mentorship opportunities</li>
              <li>Develop innovative projects that address real-world challenges</li>
              <li>Create a supportive community for learning and growth</li>
              <li>Provide resources and guidance for technical skill development</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}