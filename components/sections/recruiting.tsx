"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export const SHOW_RECRUITMENT = true

interface RecruitmentProps {
  visible?: boolean
  posterSrc?: string
}

export default function Recruitment({
  visible = SHOW_RECRUITMENT,
  posterSrc,
}: RecruitmentProps) {
  if (!visible) return null
  
  return (
    <section id="recruitment" className="p-10 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {posterSrc ? (
              <Image 
                src={posterSrc} 
                alt="Recruitment Poster" 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-center p-4">
                <p className="text-lg">Recruitment Poster Placeholder</p>
                <p>(Replace with actual image)</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold select-none">RECRUITMENTS 2.0</h2>
            <p className="text-lg select-none">
              We're looking for passionate people to join our team. Whether you're a beginner or experienced coder, there's a place for you here.
            </p>
            <p className="select-none">
              Applications are open till <b>April 1st week</b>. Don't miss this opportunity to be part of an exciting tech community!
            </p>
            <br/>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdsJFDFldxvMZA8EVOJWvtUNWs70P9xt9wd1RLoUFkX-eWB3g/viewform?usp=sharing">
            <Button size="lg">Apply Now</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}