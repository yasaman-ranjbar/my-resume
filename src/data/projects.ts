export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  demoLink: string;
  githubLink: string;
  challenges: string[];
  solutions: string[];
  screenshots: string[]; // Placeholders
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    shortDescription: "A full-featured online store with cart and checkout.",
    description:
      "A comprehensive e-commerce solution built with Next.js and Stripe integration. Features include product filtering, user authentication, and a seamless checkout process.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Zustand"],
    demoLink: "#",
    githubLink: "#",
    challenges: [
      "Handling complex state management for the cart",
      "Optimizing image loading for product grids",
    ],
    solutions: [
      "Implemented Zustand for global state",
      "Used Next.js Image component with blur placeholders",
    ],
    screenshots: ["/placeholder-1.jpg", "/placeholder-2.jpg"],
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    shortDescription: "A collaborative tool for teams to track progress.",
    description:
      "A real-time task management application allowing teams to create, assign, and track tasks. Includes drag-and-drop functionality and real-time updates.",
    technologies: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
    demoLink: "#",
    githubLink: "#",
    challenges: ["Real-time data synchronization", "Drag and drop performance on mobile"],
    solutions: ["Utilized Firebase Firestore listeners", "Optimized touch events for DnD Kit"],
    screenshots: ["/placeholder-3.jpg", "/placeholder-4.jpg"],
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    shortDescription: "Real-time weather data visualization.",
    description:
      "A beautiful weather dashboard that displays current conditions and forecasts for cities worldwide. Uses external APIs to fetch live data.",
    technologies: ["React", "Chart.js", "OpenWeatherMap API", "Styled Components"],
    demoLink: "#",
    githubLink: "#",
    challenges: ["API rate limiting", "Visualizing complex data sets"],
    solutions: ["Implemented client-side caching", "Used Chart.js for responsive graphs"],
    screenshots: ["/placeholder-5.jpg", "/placeholder-6.jpg"],
  },
];
