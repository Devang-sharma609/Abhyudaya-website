<p align="center">
	<img src="https://github.com/user-attachments/assets/f0c909be-accc-43b5-9b7a-e14d6b8dc1c8" alt="abhyudaya-website-banner" width="600">
</p>
<p align="center">
	<!-- Shields.io badges disabled, using skill icons. --></p>
<p align="center">Built with the tools and technologies:</p>
<p align="center">
		<img src="https://skillicons.dev/icons?i=nextjs,ts,supabase,vercel">
    </p>
<br>

## 🔗 Quick Links

- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#%EF%B8%8F-prerequisites)
  - [⚙️ Installation](#%EF%B8%8F-installation)
  - [🤖 Usage](#-usage)
  - [Supabase Setup](#supabase-setup)
- [🔰 Contributing](#-contributing)
- [🙌 Acknowledgments](#-acknowledgments)

## 📁 Project Structure

```sh
└── Abhyudaya-website/
    ├── README.md
    ├── app
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── layout
    │   │   ├── footer.tsx
    │   │   └── navbar.tsx
    │   ├── sections
    │   │   ├── about.tsx
    │   │   ├── domains.tsx
    │   │   ├── events.tsx
    │   │   ├── hero.tsx
    │   │   ├── leadership.tsx
    │   │   ├── projects.tsx
    │   │   ├── recruiting.tsx
    │   │   └── team.tsx
    │   ├── theme-provider.tsx
    │   └── ui
    ├── components.json
    ├── hooks
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib
    │   └── utils.ts
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    ├── styles
    │   └── globals.css
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with Abhyudaya-website, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** npm and node

## Supabase Setup

1. Create a new project in Supabase
2. Go to the SQL editor in your Supabase dashboard
3. Run the following SQL commands to create the necessary tables:

```
--> Create the events table
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

--> Create the event_registrations table
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

--> Add some sample events
INSERT INTO public.events (title, description, date, time, location, capacity, image, is_past)
VALUES
('Web Development Workshop', 'Learn the fundamentals of modern web development with React and Next.js.', '2023-11-15', '14:00 - 17:00', 'Innovation Lab, Room 204', 50, '/placeholder.svg?height=400&width=600', false),
('AI/ML Hackathon', 'A 24-hour hackathon focused on building AI/ML solutions for real-world problems.', '2023-11-25', '09:00 - 09:00 (next day)', 'Main Auditorium', 100, '/placeholder.svg?height=400&width=600', false),
('Introduction to Cybersecurity', 'A workshop covering the basics of cybersecurity, common vulnerabilities, and best practices.', '2023-10-10', '13:00 - 16:00', 'Computer Lab 2', 40, '/placeholder.svg?height=400&width=600', true);
```

4. Set up Row Level Security (RLS) policies as needed to secure your data
5. Copy your Supabase project URL and anon key to the `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The events are now fetched from your Supabase database. Make sure to add, update, or remove events through the Supabase dashboard or API as needed.

### ⚙️ Installation

you can replicate the website using the following method:

**Build from source:**

1. Clone the repository:

```sh
git clone https://github.com/Devang-sharma609/Abhyudaya-website
```

2. Navigate to the project directory:

```sh
cd Abhyudaya-website
```

3. Install the project dependencies: using `npm`
```sh
npm install
```

### 🤖 Usage

Run Abhyudaya-website using the following command:
```sh
npm run dev
```

## 🔰 Contributing
- **🐛 [Report Issues](https://github.com/Devang-sharma609/Abhyudaya-website/issues)**: Submit bugs found or log feature requests for the `Abhyudaya-website` project.
- **💡 [Submit Pull Requests](https://github.com/Devang-sharma609/Abhyudaya-website/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<p>Contributor Graph</p>
<p align="left">
   <a href="https://github.com{/Devang-sharma609/Abhyudaya-website/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Devang-sharma609/Abhyudaya-website">
   </a>
</p>
</details>

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.
