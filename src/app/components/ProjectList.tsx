'use client'

import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Mes Projets</h2>
      <ul className="mt-4 space-y-3">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
