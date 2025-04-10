"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

// Navigation links data
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function MobileNavigation({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Handle scroll detection for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMobile) {
    return (
      <nav className={cn("hidden md:block", className)}>
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden safe-touch-target"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(80%,300px)] px-0">
        <SheetHeader className="px-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href} className="px-2">
                <Link
                  href={link.href}
                  className="flex items-center py-3 px-4 rounded-md hover:bg-secondary transition-colors"
                  onClick={handleLinkClick}
                >
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
