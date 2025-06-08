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
          "Developed both web and mobile applications simultaneously, ensuring a shared codebase for both platforms.",
          "Built internal utilities to streamline Firebase interactions.",
          "General mobile application performance optimization and implemented offline features",
        ],
      },
      {
        name: "Food Delivery Platform",
        technologies: "Angular, React, React Native",
        features: [
          "Maintained multiple applications, including a web versions built with Angular (for common users) and React (for staff).",
          "Refactored legacy codebase, migrating to a newer libraries and implementing best practices.",
          "Enhanced test coverage with new unit and end-to-end tests.",
        ],
      },
      {
        name: "Sports Betting Platform",
        technologies: "React",
        features: [
          "Focused on responsive UI and interactive components for both mobile and desktop.",
          "Collaborated closely with backend developers to facilitate rapid feature implementation.",
          "Contributed to creating reusable component libraries.",
        ],
      },
    ],
  },
];

export type ExperienceDataType = (typeof data)[0];
