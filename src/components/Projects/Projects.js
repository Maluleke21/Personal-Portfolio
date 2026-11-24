import React from "react";
import { Container } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import healthcare from "../../Assets/Projects/healthcare.webp";
import fitforge from "../../Assets/Projects/fitforge.svg";
import fredrose from "../../Assets/Projects/fredrose.webp";

const projects = [
  {
    title: "Healthcare_DB",
    stack: "Python · pandas · PostgreSQL",
    image: healthcare,
    alt: "Gender analysis chart from the healthcare ETL notebook",
    description: "I transformed nested CDC API records into relational tables, then used SQL and a Jupyter notebook to explore the cleaned healthcare data.",
    href: "https://github.com/Maluleke21/healthcare_db-etl-pipeline",
    linkText: "Explore the pipeline"
  },
  {
    title: "FitForge",
    stack: "React · TypeScript · Express · PostgreSQL",
    image: fitforge,
    brand: true,
    alt: "FitForge app icon",
    description: "A mobile-first fitness app for planning workouts, tracking nutrition, and reviewing progress. A React frontend and Express API keep each user’s fitness records tied to their account."
  },
  {
    title: "Fredrose Security Services",
    stack: "React · TypeScript · Vite",
    image: fredrose,
    alt: "Team photograph from the Fredrose Security Services website",
    description: "I built a responsive website for a security company in Malamulele. Visitors can explore guarding and security systems, find emergency contact details, and request a security assessment.",
    href: "https://github.com/Maluleke21/fredrose-Security",
    linkText: "View source"
  }
];

export default function Projects() {
  return (
    <main className="project-section selected-work">
      <Container>
        <h1>Selected <span className="accent">projects</span></h1>
        <div className="work-grid">
          {projects.map(project => <ProjectCard key={project.title} {...project} />)}
        </div>
      </Container>
    </main>
  );
}
