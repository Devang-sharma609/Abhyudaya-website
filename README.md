# Event Registration App

This app allows users to register for events.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Supabase Setup

1. Create a new project in Supabase
2. Go to the SQL editor in your Supabase dashboard
3. Run the following SQL commands to create the necessary tables:

\`\`\`sql
-- Create the events table
CREATE TABLE public.events (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TEXT,
    location TEXT,
    capacity INTEGER,
    registered INTEGER DEFAULT 0,
    image TEXT,
    is_past BOOLEAN DEFAULT FALSE
);

-- Create the event_registrations table
CREATE TABLE public.event_registrations (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    event_id BIGINT REFERENCES public.events(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    student_id TEXT,
    department TEXT,
    message TEXT
);

-- Add some sample events
INSERT INTO public.events (title, description, date, time, location, capacity, image, is_past)
VALUES
('Web Development Workshop', 'Learn the fundamentals of modern web development with React and Next.js.', '2023-11-15', '14:00 - 17:00', 'Innovation Lab, Room 204', 50, '/placeholder.svg?height=400&width=600', false),
('AI/ML Hackathon', 'A 24-hour hackathon focused on building AI/ML solutions for real-world problems.', '2023-11-25', '09:00 - 09:00 (next day)', 'Main Auditorium', 100, '/placeholder.svg?height=400&width=600', false),
('Introduction to Cybersecurity', 'A workshop covering the basics of cybersecurity, common vulnerabilities, and best practices.', '2023-10-10', '13:00 - 16:00', 'Computer Lab 2', 40, '/placeholder.svg?height=400&width=600', true);
\`\`\`

4. Set up Row Level Security (RLS) policies as needed to secure your data
5. Copy your Supabase project URL and anon key to the `.env.local` file:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

6. Restart your development server after setting up the environment variables

## Usage

1. Run the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. Browse the events, RSVP for upcoming events, and view past events

The events are now fetched from your Supabase database. Make sure to add, update, or remove events through the Supabase dashboard or API as needed.