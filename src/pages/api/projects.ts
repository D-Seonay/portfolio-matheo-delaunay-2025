import type { NextApiRequest, NextApiResponse } from "next";
import { Project, ApiResponse, Lang } from "../../types";

const projects: Record<Lang, Project[]> = {
  fr: [
    { 
      id: "1", 
      name: "App Restaurant", 
      description: "Application web pour la gestion de restaurants", 
      image: "/1.png", 
      link: "#", 
      status: "development",
      repository: {
        url: "https://github.com/D-Seonay/app-restaurant",
        isPrivate: false
      },
      tags: ["Angular", "Spring Boot", "PostgreSQL"],
      longDescription: "Une application web complète permettant aux restaurants de gérer leurs menus, leurs commandes et leurs réservations. L'interface utilisateur moderne et intuitive permet une gestion facile et efficace.",
      features: [
        "Gestion des menus en temps réel",
        "Système de réservation",
        "Interface d'administration",
        "Statistiques et analyses"
      ],
      technologies: [
        "Angular",
        "TailwindCSS",
        "Spring Boot",
        "PostgreSQL"
      ],
      screenshots: [
        "/1.png",
        "/2.png",
        "/3.png"
      ],
      collaborators: []
    },
    { 
      id: "2", 
      name: "Food Collect (Fictif)",
      description: "Réfonte du site de Food Collect",
      image: "/projects/2/food-collect-1.png",
      link: "https://food-collect-refactor.vercel.app/",
      status: "development",
      repository: {
        url: "https://github.com/D-Seonay/food-collect",
        isPrivate: false
      }, 
      tags: ["React", "TailwindCSS"],
      longDescription: "Ce projet est la refonte du site de l'entreprise Food-Collect. Il a été développé en utilisant React, Tailwind CSS et Framer Motion pour offrir une expérience utilisateur moderne et réactive.",
      features: [
        "Animations personnalisées",
        "Interface utilisateur moderne",
        "Responsive design"
      ],
      technologies: [
        "React",
        "TailwindCSS",
        "Framer Motion"
      ],  
      screenshots: [
        "/projects/2/food-collect-1.png",
        "/projects/2/food-collect-2.png",
        "/projects/2/food-collect-3.png"
      ],
      collaborators: []
    },
    { 
      id: "3",
      name: "Pokédex React-Django",
      description: "Application web de gestion de Pokémon",
      image: "/projects/3/pokedex-home.png",
      link: "",
      status: "development", 
      repository: {
        url: "https://github.com/D-Seonay/pokedex-react-django",
        isPrivate: false
      },
      tags: ["React", "Django", "SQLite3"],
      longDescription: "Une application web complète permettant d'afficher et d'interagir avec les données des Pokémon. Le backend Django gère les utilisateurs et les données Pokémon, tandis que le frontend React offre une expérience utilisateur dynamique. L'application récupère les données via l'API PokeAPI, les stocke dans SQLite3.",
      features: [
        "Authentification utilisateur",
        "Intégration PokeAPI",
        "Tableau des scores",
        "Gestion des Pokémon favoris"
      ],
      technologies: [
        "React",
        "Django",
        "SQLite3",
        "TailwindCSS",
        "PokeAPI"
      ],
      screenshots: [
        "/projects/3/pokedex-home.png",
        "/projects/3/pokedex-detail.png",
        "/projects/3/pokedex-item.png",
        "/projects/3/pokedex-login.png"
      ],
      collaborators: [
        {
          id: "1",
          name: "Mathéo DELAUNAY",
          role: "Développeur Full Stack",
          image: "/collaborators/matheo.jpg",
          link: "https://github.com/D-Seonay"
        }
      ]
    },
    { 
      id: "4",
      name: "Portfolio",
      description: "Portfolio personnel présentant mes projets et compétences",
      image: "/projects/4/portfolio-home.png", 
      link: "https://matheo-delaunay.tech",
      status: "production",
      repository: {
        url: "https://github.com/D-Seonay/portfolio",
        isPrivate: false
      },
      tags: ["React", "Next.js", "TailwindCSS"],
      longDescription: "Portfolio personnel développé avec React.js, présentant mes compétences, projets et parcours professionnel. Inspiré du design de Katy_v4, ce site vitrine met en valeur mon travail de développeur de manière moderne et interactive.",
      features: [
        "Présentation des projets",
        "Section compétences",
        "Parcours professionnel",
        "Design responsive",
        "Mode sombre/clair"
      ],
      technologies: [
        "React",
        "Next.js", 
        "TailwindCSS",
        "Framer Motion",
        "TypeScript"
      ],
      screenshots: [
        "/projects/4/portfolio-home.png",
        "/projects/4/portfolio-projects.png",
        "/projects/4/portfolio-about.png"
      ],
      collaborators: [
        {
          id: "1",
          name: "Mathéo DELAUNAY",
          role: "Développeur Full Stack",
          image: "/collaborators/matheo.jpg",
          link: "https://github.com/D-Seonay"
        }
      ]
    },
  ],

  en: [
    { 
      id: "1", 
      name: "Restaurant App", 
      description: "Web application for restaurant management", 
      image: "/1.png", 
      link: "#", 
      status: "development",
      repository: {
        url: "https://github.com/D-Seonay/app-restaurant",
        isPrivate: false
      },
      tags: ["Angular", "Spring Boot", "PostgreSQL"],
      longDescription: "A complete web application allowing restaurants to manage their menus, orders and reservations. The modern and intuitive user interface allows for easy and efficient management.",
      features: [
        "Real-time menu management",
        "Reservation system", 
        "Admin interface",
        "Statistics and analytics"
      ],
      technologies: [
        "Angular",
        "TailwindCSS",
        "Spring Boot",
        "PostgreSQL"
      ],
      screenshots: [
        "/1.png",
        "/2.png",
        "/3.png"
      ],
      collaborators: []
    },
    { 
      id: "2", 
      name: "Food Collect (Fictitious)",
      description: "Food Collect website redesign",
      image: "/projects/2/food-collect-1.png",
      link: "https://food-collect-refactor.vercel.app/",
      status: "development",
      repository: {
        url: "https://github.com/D-Seonay/food-collect",
        isPrivate: false
      }, 
      tags: ["React", "TailwindCSS"],
      longDescription: "This project is a redesign of the Food-Collect company website. It was developed using React, Tailwind CSS and Framer Motion to provide a modern and responsive user experience.",
      features: [
        "Custom animations",
        "Modern user interface",
        "Responsive design"
      ],
      technologies: [
        "React",
        "TailwindCSS",
        "Framer Motion"
      ],  
      screenshots: [
        "/projects/2/food-collect-1.png",
        "/projects/2/food-collect-2.png",
        "/projects/2/food-collect-3.png"
      ],
      collaborators: []
    },
    { 
      id: "3",
      name: "React-Django Pokédex",
      description: "Pokémon management web application",
      image: "/projects/3/pokedex-home.png",
      link: "",
      status: "development", 
      repository: {
        url: "https://github.com/D-Seonay/pokedex-react-django",
        isPrivate: false
      },
      tags: ["React", "Django", "SQLite3"],
      longDescription: "A complete web application for displaying and interacting with Pokémon data. The Django backend handles users and Pokémon data, while the React frontend provides a dynamic user experience. The application retrieves data via the PokeAPI, stores it in SQLite3, and allows users to battle with their favorite Pokémon.",
      features: [
        "User authentication",
        "PokeAPI integration",
        "Player battle system",
        "Scoreboard",
        "Favorite Pokémon management"
      ],
      technologies: [
        "React",
        "Django",
        "SQLite3",
        "TailwindCSS",
        "PokeAPI"
      ],
      screenshots: [
        "/projects/3/pokedex-home.png",
        "/projects/3/pokedex-detail.png",
        "/projects/3/pokedex-item.png",
        "/projects/3/pokedex-login.png"
      ],
      collaborators: [
        {
          id: "1",
          name: "Mathéo DELAUNAY",
          role: "Full Stack Developer",
          image: "/collaborators/matheo.jpg",
          link: "https://github.com/D-Seonay"
        }
      ]
    },
    { 
      id: "4",
      name: "Portfolio",
      description: "Personal portfolio showcasing my projects and skills",
      image: "/projects/4/portfolio-home.png",
      link: "https://matheo-delaunay.tech",
      status: "production",
      repository: {
        url: "https://github.com/D-Seonay/portfolio",
        isPrivate: false
      },
      tags: ["React", "Next.js", "TailwindCSS"],
      longDescription: "Personal portfolio developed with React.js, showcasing my skills, projects and professional journey. Inspired by Katy_v4's design, this showcase site highlights my work as a developer in a modern and interactive way.",
      features: [
        "Project showcase",
        "Skills section",
        "Professional journey",
        "Responsive design",
        "Dark/light mode"
      ],
      technologies: [
        "React",
        "Next.js", 
        "TailwindCSS",
        "Framer Motion",
        "TypeScript"
      ],
      screenshots: [
        "/projects/4/portfolio-home.png",
        "/projects/4/portfolio-projects.png",
        "/projects/4/portfolio-about.png"
      ],
      collaborators: [
        {
          id: "1",
          name: "Mathéo DELAUNAY",
          role: "Full Stack Developer",
          image: "/collaborators/matheo.jpg",
          link: "https://github.com/D-Seonay"
        }
      ]
    }
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Project[] | Project>>) {
  const lang = (req.query.lang as Lang) || "fr";
  const projectId = req.query.id as string;

  if (projectId) {
    const project = projects[lang].find(p => p.id === projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json({ data: project });
  }

  res.status(200).json({ data: projects[lang] });
}
