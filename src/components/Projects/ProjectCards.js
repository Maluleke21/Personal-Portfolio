import React from "react";

export default function ProjectCard({ title, stack, image, alt, brand, description, href, linkText }) {
  return (
    <article className="work-card">
      <div className={brand ? "work-image work-brand" : "work-image"}>
        <img src={image} alt={alt} />
      </div>
      <div className="work-copy">
        <p className="work-stack">{stack}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {href && <a href={href} target="_blank" rel="noopener noreferrer">{linkText} <span aria-hidden="true">↗</span></a>}
      </div>
    </article>
  );
}
