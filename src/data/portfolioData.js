/**
 * Portfolio Data Configuration for Hemant Saxena
 * Updated with LinkedIn Profile & OS Code Club Leadership Details
 */

export const personalInfo = {
  name: "Hemant Saxena",
  title: "Computer Science & Engineering Undergraduate",
  role: "PR & Marketing Lead | Core Team Member @ OS Code Club",
  headline: "B.Tech CSE @ REVA University ('29) | PR & Marketing Lead @ OS Code Club | Java, Python, C, SQL | Exploring Software Engineering & AI Agents",
  university: "REVA University",
  location: "Bengaluru, Karnataka, India",
  year: "2nd Year",
  graduationYear: "2029",
  batch: "2025 – 2029",
  tagline: "Curious builder with strong computer science fundamentals, passionate about low-level systems, software development, and exploring emerging tech.",
  status: "PR & Marketing Lead @ OS Code Club • Open to Collaborative Opportunities",
  email: "hemantksra@gmail.com",
  
  // Social and profile links (Direct URLs)
  links: {
    github: "https://github.com/hemantksra",
    linkedin: "https://www.linkedin.com/in/hemantsaxenaksra/",
    resume: "#", // Drop your resume PDF into public folder and link here
  }
};

export const aboutData = {
  headline: "Building from foundational principles — from bits and bytes to scalable software & developer community leadership.",
  bio: [
    "I am a second-year B.Tech Computer Science and Engineering student at REVA University, Bengaluru (Class of 2029), with a strong foundation in core computer science principles, programming, and software development.",
    "As the PR & Marketing Lead and Core Member of the OS Code Club, I spearhead event outreach, digital campaigns, and community initiatives while collaborating closely with engineering teams to organize developer-focused workshops, open-source initiatives, and hackathons.",
    "I enjoy bridging technical problem-solving with community growth. Rather than treating computing as a black box, I dive into low-level systems, memory architectures, algorithms, and modern agentic engineering workflows (Antigravity) to build robust, scalable solutions."
  ],
  leadershipExperience: {
    title: "PR & Marketing Lead | Core Team Member",
    organization: "OS Code Club (REVA University)",
    location: "Bengaluru, Karnataka, India",
    period: "2nd Year – Present",
    highlights: [
      "Lead the Public Relations & Marketing vertical, driving brand awareness and student engagement across campus.",
      "Direct promotional campaigns and content strategies for hackathons, open-source workshops, and technical events.",
      "Coordinate with technical, design, and operations teams to align event messaging and boost member participation.",
      "Mentor junior peers and organize peer-learning sessions on programming fundamentals and tooling."
    ]
  },
  pillars: [
    {
      title: "Systems & Low-Level Foundations",
      description: "Understanding operating systems concepts, memory hierarchies, pointer mechanics, and process execution from first principles.",
      icon: "cpu",
      tag: "Deep Tech"
    },
    {
      title: "Data Structures & Algorithms",
      description: "Cultivating analytical problem-solving through disciplined practice with graph traversals, dynamic programming, and asymptotic efficiency.",
      icon: "code",
      tag: "Problem Solving"
    },
    {
      title: "Software Engineering & Tools",
      description: "Architecting modular, maintainable software utilizing modern version control, developer environments, and automated workflows.",
      icon: "terminal",
      tag: "Engineering"
    },
    {
      title: "Community Leadership & PR",
      description: "Leading marketing, communications, and technical events as PR & Marketing Lead at OS Code Club to empower student developers.",
      icon: "users",
      tag: "Leadership"
    }
  ]
};

export const skillsData = {
  categories: [
    {
      id: "languages",
      title: "Languages",
      description: "Core programming languages used for systems programming, algorithms, and application logic.",
      skills: [
        { name: "C", level: "Systems & Memory", highlight: true, note: "Pointers, structs, systems programming" },
        { name: "Java", level: "OOP & Algorithms", highlight: true, note: "Object-oriented design, collections, DSA" },
        { name: "Python", level: "Scripting & Dev", highlight: true, note: "Automation, prototyping, rapid problem solving" },
        { name: "SQL", level: "Database Systems", highlight: false, note: "Relational queries, schema design, joins" }
      ]
    },
    {
      id: "core-focus",
      title: "Core Focus",
      description: "Primary computer science domains and engineering methodologies.",
      skills: [
        { name: "Software Development", level: "Applied Architecture", highlight: true, note: "Modular design, clean code principles, refactoring" },
        { name: "Data Structures & Algorithms", level: "Core Foundations", highlight: true, note: "Trees, graphs, dynamic programming, complexity analysis" },
        { name: "Systems Fundamentals", level: "Low-Level Computing", highlight: true, note: "Memory management, process cycles, OS fundamentals" },
        { name: "Database Management", level: "Data Storage", highlight: false, note: "Relational data structures & optimized queries" }
      ]
    },
    {
      id: "tools",
      title: "Developer Tools & Workflows",
      description: "Environments, version control, and productivity tools powering the daily development cycle.",
      skills: [
        { name: "VS Code", level: "Primary IDE", highlight: true, note: "Debugging, extensions, optimized dev workflow" },
        { name: "Antigravity", level: "Agentic Engineering", highlight: true, note: "AI-assisted pair programming & workflow execution" },
        { name: "Git / GitHub", level: "Version Control", highlight: true, note: "Branching workflows, collaboration, code reviews" }
      ]
    },
    {
      id: "leadership",
      title: "Leadership & Community",
      description: "Strategic outreach, community building, and technical event leadership at OS Code Club.",
      skills: [
        { name: "Public Relations (PR)", level: "Campus Outreach", highlight: true, note: "Brand building, communications, and media" },
        { name: "Community Management", level: "Student Devs", highlight: true, note: "Fostering collaboration & active participation" },
        { name: "Team Leadership", level: "Vertical Lead", highlight: true, note: "Coordinating cross-functional student teams" },
        { name: "Event Marketing", level: "Campaigns", highlight: false, note: "Promoting hackathons, tech talks & workshops" }
      ]
    }
  ]
};

/**
 * FEATURED PROJECTS (Placeholder Module)
 * Note: Keeping projects modular as requested; user will update these later.
 */
export const projectsData = [
  {
    id: "project-1",
    title: "Low-Level Memory Allocator & Cache Simulator",
    badge: "Systems & Architecture",
    description: "A lightweight custom heap memory allocator simulation implementing segregated free lists and first-fit allocation policies to analyze memory fragmentation and cache line locality.",
    problemSolved: "Simulates memory block splitting and coalescing in C to demonstrate how operating systems minimize internal fragmentation and manage raw pointer arithmetic.",
    tags: ["C", "Systems Programming", "Memory Management", "Algorithms"],
    github: "https://github.com/hemantksra",
    demo: "#",
    featured: true,
    highlightMetric: "Sub-microsecond allocation cycle simulation"
  },
  {
    id: "project-2",
    title: "Algorithmic Graph & Pathfinding Engine",
    badge: "Data Structures & DSA",
    description: "An interactive computational graph visualizer implementing Dijkstra's algorithm, A* search, and Breadth-First Search to demonstrate real-time graph traversal and heuristic optimization.",
    problemSolved: "Bridges the gap between theoretical algorithm analysis and visual execution, providing step-by-step state inspection of priority queues and adjacency matrices.",
    tags: ["Java", "Data Structures", "Graph Theory", "Algorithms"],
    github: "https://github.com/hemantksra",
    demo: "#",
    featured: true,
    highlightMetric: "O((V + E) log V) optimized traversal"
  },
  {
    id: "project-3",
    title: "Concurrent Task Runner & CLI Engine",
    badge: "Software Development",
    description: "A command-line task execution tool designed to orchestrate multi-step build pipelines, process isolation, and automated script workflows with structured logging.",
    problemSolved: "Solves repetitive developer task execution through an intuitive configuration syntax and robust child-process error handling.",
    tags: ["Python", "CLI Tooling", "OS Subprocesses", "Developer Experience"],
    github: "https://github.com/hemantksra",
    demo: "#",
    featured: true,
    highlightMetric: "Zero-dependency lightweight runner"
  }
];

export const terminalCodeSnippet = `// Exploring systems fundamentals & low-level memory
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

int main(void) {
    printf("Hemant Saxena @ REVA University\\n");
    printf("PR & Marketing Lead @ OS Code Club\\n");
    printf("Focus: Systems, DSA, & Agentic Engineering\\n");
    return 0;
}`;
