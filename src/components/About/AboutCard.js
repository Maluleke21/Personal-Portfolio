import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I'm <span className="accent">Hlavutelo Denrol Maluleke</span> a{" "}
            <span className="accent">Data Engineer & Software Developer</span> from{" "}
            <span className="accent">Johannesburg, South Africa.</span>
            <br />
            <br />
            I worked at <span className="accent">FNB (First National Bank)</span> as
            a Data Engineer, where I designed and maintained scalable ETL/ELT pipelines,
            built SQL-based data solutions and supported end-to-end project delivery across
            the full SDLC.
            <br />
            <br />
            I hold a <span className="accent">Diploma in Software Development</span> from
            IIE Rosebank College and have completed intensive programmes at WeThinkCode_
            and the Faith Mangope Technology and Leadership Institute. I'm also a
            certified <span className="accent">Microsoft AI-900: Azure AI Fundamentals</span>{" "}
            professional.
            <br />
            <br />
            When I'm not building data pipelines or shipping code, you'll find me:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Video Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring new technologies & certifications
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling & experiencing new cultures
            </li>
          </ul>

          <p style={{ color: "#bec69e" }}>
            "Strive to build things that make a difference!"
          </p>
          <footer className="blockquote-footer">Hlavutelo</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
