"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})

// Form schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  student_id: z.string().min(0, { message: "Student ID must be at least 9 characters." }),
  department: z.string().min(2, { message: "Please enter your department." }),
  message: z.string().optional(),
})

type Event = {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registered: number
  image: string
  is_past: boolean
}

export default function Events() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      student_id: "NA",
      department: "",
      message: "",
    },
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

      if (error) {
        if (error.code === "42P01") {
          // Table doesn't exist
          setError("The events table has not been set up. Please check the README for setup instructions.")
        } else {
          throw error
        }
      } else {
        setEvents(data || [])
      }
    } catch (error) {
      console.error("Error fetching events:", error)
      setError("Failed to load events. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id)
  }

  const handleRSVP = (event: Event) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedEvent) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Step 1: Insert the registration record
      const { data, error: insertError } = await supabase.from("event_registrations").insert([
        {
          event_id: selectedEvent.id,
          ...values,
        },
      ])

      if (insertError) throw insertError

      // Step 2: Update the registered count in the events table
      const { error: updateError } = await supabase
        .from("events")
        .update({ registered: selectedEvent.registered + 1 })
        .eq("id", selectedEvent.id)

      if (updateError) throw updateError
      
      // Show success message
      setSubmitSuccess(true)
      
      // Step 3: Fetch fresh data from the database instead of updating local state
      await fetchEvents()
      
      setTimeout(() => {
        setIsDialogOpen(false)
        setSubmitSuccess(false)
        form.reset()
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading events...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  const upcomingEvents = events.filter((event) => !event.is_past)
  const pastEvents = events.filter((event) => event.is_past)

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 select-none">Events</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto select-none">
          Join our workshops, hackathons, and tech talks to enhance your skills and connect with like-minded
          individuals.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6"
          >
            {upcomingEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No upcoming events at the moment. Check back later!</p>
              </div>
            )}
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      loading={'lazy'}
                      className="w-full h-full object-cover aspect-video md:aspect-square"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>
                            {event.registered} / {event.capacity} registered
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-6">
                      <Button onClick={() => handleRSVP(event)} disabled={event.registered >= event.capacity}>
                        {event.registered >= event.capacity ? "Event Full" : "RSVP Now"}
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="past">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6"
          >
            {pastEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No past events to display.</p>
              </div>
            )}
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      loading={'lazy'}
                      className="w-full h-full object-cover aspect-video md:aspect-square"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>
                            {event.registered} / {event.capacity} attended
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 pt-6">
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/event/${event.id}/highlights`)}
                        className="flex items-center gap-2"
                      >View Highlights</Button>
                    </CardFooter>
                    {expandedEvent === event.id && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Event Highlights</h4>
                        <p className="text-muted-foreground mb-4">
                          This event was a great success with {event.registered} participants. Students learned about{" "}
                          {event.title.toLowerCase()} through hands-on exercises and interactive sessions.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                          {[1, 2, 3, 4].map((i) => (
                            <img
                              key={i}
                              src={`/placeholder.svg?height=100&width=100&text=Photo ${i}`}
                              alt={`Event photo ${i}`}
                              className="w-full h-auto rounded-md"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>RSVP for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>Fill out the form below to register for this event.</DialogDescription>
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
                You have successfully registered for this event. We'll send you a confirmation email shortly.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" autoComplete="name" {...field} />
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
                        <Input type="email" placeholder="john.doe@example.com" autoComplete="email" {...field} />
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
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" autoComplete="enrollment"{...field} />
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
                          <Input placeholder="Computer Science" autoComplete=""{...field} />
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

                {submitError && <p className="text-sm text-destructive">{submitError}</p>}

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
