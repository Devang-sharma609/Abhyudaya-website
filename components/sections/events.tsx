"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Form schema
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .regex(/^[A-Za-z ]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      (email) =>
        email.endsWith(".in") ||
        email.endsWith("gmail.com") ||
        email.endsWith("outlook.com"),
      {
        message: "Please use a valid email domain.",
      }
    ),
  student_id: z
    .string()
    .min(0, { message: "Invalid Enrollment Number" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Enrollment number can only contain uppercase letters and numbers.",
    })
    .or(z.literal("NA"))
    .or(z.literal("na")),
  department: z.string().min(2, { message: "Required" }),
  year_sem: z.string().min(2, { message: "Required" }),
  contact: z
    .string()
    .min(10, { message: "Required" })
    .max(15, { message: "Contact number is Invalid" })
    .regex(/^(\+\d{1,3}[-\s]?)?(\d{10,12})$/, {
      message:
        "Please enter a valid phone number (10-12 digits with optional country code)",
    }),
  message: z.string().optional(),
});

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  image: string;
  is_past: boolean;
};

export default function Events() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      student_id: "",
      department: "",
      year_sem: "",
      contact: "",
      message: "",
    },
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        if (error.code === "42P01") {
          // Table doesn't exist
          setError(
            "The events table has not been set up. Please check the README for setup instructions."
          );
        } else {
          throw error;
        }
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const handleRSVP = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedEvent) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Step 1: Insert the registration record
      const { data, error: insertError } = await supabase
        .from("event_registrations")
        .insert([
          {
            event_id: selectedEvent.id,
            ...values,
          },
        ]);

      if (insertError) throw insertError;

      // Step 2: Update the registered count in the events table
      const { error: updateError } = await supabase
        .from("events")
        .update({ registered: selectedEvent.registered + 1 })
        .eq("id", selectedEvent.id);

      if (updateError) throw updateError;

      // Show success message
      setSubmitSuccess(true);

      // Step 3: Fetch fresh data from the database instead of updating local state
      await fetchEvents();

      // Remove the setTimeout that was automatically closing the dialog
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  const upcomingEvents = events.filter((event) => !event.is_past);
  const pastEvents = events.filter((event) => event.is_past);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24" id="events">
      <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">Our Events</h2>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid max-w-[50%] grid-cols-2 mb-8 mx-auto">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden flex flex-col h-full">
                  {/* Event image with 1:1 aspect ratio */}
                  <div className="relative w-full pb-[100%]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-lg md:text-xl line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0 flex-grow">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.registered} / {event.capacity} registered</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 md:p-6 pt-0 md:pt-2">
                      <Button
                        onClick={() => handleRSVP(event)}
                        className="w-full sm:w-auto"
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity
                          ? "Event Full"
                          : "RSVP Now"}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                <p className="text-muted-foreground">Check back later for new events or explore our past events.</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="past">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col h-full">
                {/* Event image with 1:1 aspect ratio */}
                <div className="relative w-full pb-[100%]">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 md:p-6 md:pt-0 flex-grow">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.registered} / {event.capacity} registered</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>RSVP for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to register for this event.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Registration Successful!</h3>
              <p className="text-muted-foreground">
                Join the Whatsapp group of the respective event in the WhatsApp
                community.
              </p>
              <div className="mt-4">
                <Link href="https://chat.whatsapp.com/CnL5555x2TN7s17R5aiwJp">
                  <Button size="lg">Join Community</Button>
                </Link>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="student_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enrollment Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="NA if unavailable"
                            autoComplete="enrollment"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Computer Science"
                            autoComplete="department"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year_sem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year/Semester</FormLabel>
                        <FormControl>
                          <Input placeholder="2nd Year / 3rd Sem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+91 1234567890"
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any questions or special requirements?"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}

                <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-0">
                  <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
