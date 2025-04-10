"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export default function EventHighlights({
  params,
}: {
  params: { id: string };
}) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Fetch event details
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;
        setEvent(data);

        // Simulate loading images from directory
        // In production, you would fetch from actual storage
        const imagePaths = Array.from(
          { length: 1 },
          (_, i) => `/event-highlights/event-${params.id}/image${i + 1}.jpg`
        );
        setImages(imagePaths);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading event highlights...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500">{error || "Event not found"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Events
      </Button>

      <div className="relative max-w-8xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        {/* Navigation button - Previous */}
        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="md:self-center"
            onClick={prevImage}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        <div className="flex-1 w-full">
          <div className="relative overflow-hidden rounded-lg bg-background shadow-xl">
            {/* Image carousel */}
            <div className="aspect-[16/9] relative">
              {images.length > 0 ? (
                <div className="w-full h-full relative">
                  <img
                    src={images[currentImageIndex]}
                    alt={`Event highlight ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Replace the img with an error message div
                      const parent = e.currentTarget.parentNode;
                      if (parent) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className =
                          "w-full h-full flex flex-col items-center justify-center bg-muted";
                        const alertIcon = document.createElement("div");
                        alertIcon.className = "text-muted-foreground mb-2";
                        alertIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle h-10 w-10"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
                        const errorText = document.createElement("p");
                        errorText.className =
                          "text-muted-foreground text-center";
                        errorText.textContent = "Failed to load image";
                        errorDiv.appendChild(alertIcon);
                        errorDiv.appendChild(errorText);
                        parent.replaceChild(errorDiv, e.currentTarget);
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
            </div>
          </div>

          {/* Image thumbnails */}
          {images.length > 1 && (
            <div className="p-4 flex overflow-x-auto gap-2 mt-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="w-full h-full relative">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const parent = e.currentTarget.parentNode;
                        if (parent) {
                          const errorDiv = document.createElement("div");
                          errorDiv.className =
                            "w-full h-full flex items-center justify-center bg-muted";
                          errorDiv.innerHTML =
                            '<span class="text-xs text-muted-foreground">Error</span>';
                          parent.replaceChild(errorDiv, e.currentTarget);
                        }
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation button - Next */}
        {images.length > 1 && (
          <Button
            variant="outline"
            size="icon"
            className="md:self-center"
            onClick={nextImage}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-8 mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">About This Event</h2>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-medium mb-2">Event Details</h3>
            <ul className="space-y-2">
              <li>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </li>
              <li>
                <strong>Time:</strong> {event.time}
              </li>
              <li>
                <strong>Location:</strong> {event.location}
              </li>
              <li>
                <strong>Participants:</strong> {event.registered}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
