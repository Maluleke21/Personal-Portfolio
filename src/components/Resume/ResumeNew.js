import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import Particle from "../Particle";

const resumeUrl = "https://maluleke.netlify.app/static/media/Hlavutelo_Maluleke_CV.0da9b0d2b34bc5e041e8.pdf";

function ResumeNew() {
  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container style={{ position: "relative" }}>
        <h1>Résumé</h1>
        <Button variant="primary" href={resumeUrl} target="_blank" rel="noopener noreferrer">
          <AiOutlineDownload aria-hidden="true" /> Open CV (PDF)
        </Button>
        <iframe
          src={resumeUrl}
          title="Hlavutelo Maluleke’s résumé"
          style={{ display: "block", width: "100%", height: "80vh", border: 0, marginTop: "1.5rem" }}
        />
      </Container>
    </Container>
  );
}

export default ResumeNew;
