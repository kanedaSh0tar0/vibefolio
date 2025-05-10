export const data = [
  {
    company: "Incora",
    lengthOfService: "2023 – 2025",
    position: "Front-end Developer (Shadow Coder)",
    projects: [
      {
        name: "Hotel Management Platform",
        technologies: "React, React Native, Firebase",
        features: [
          "Developed cross-platform features using a shared codebase for both web and mobile.",
          "Built internal utilities to simplify Firebase usage and improve performance.",
          "Contributed to booking workflows, user dashboards, and offline support.",
        ],
      },
      {
        name: "Food Delivery Platform",
        technologies: "Angular, React, React Native",
        features: [
          "Implemented components and pages for separate apps tailored to different user roles.",
          "Ensured consistent design language across platforms.",
          "Helped debug state management issues and asynchronous flows.",
        ],
      },
      {
        name: "Sports Betting Platform",
        technologies: "React",
        features: [
          "Focused on responsive UI and interactive components for both mobile and desktop.",
          "Worked on live odds rendering and optimized performance for high-traffic scenarios.",
          "Contributed to reusable component libraries.",
        ],
      },
    ],
  },
];

export type ExperienceDataType = (typeof data)[0];
