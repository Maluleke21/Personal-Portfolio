import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AiOutlineDownload } from "react-icons/ai";
import Particle from "../Particle";

const resumeUrl = "/Hlavutelo-Maluleke-CV.pdf";

function ResumeNew() {
  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container style={{ position: "relative" }}>
        <h1>Résumé</h1>
        <Button variant="primary" href={resumeUrl} download="Hlavutelo-Maluleke-CV.pdf">
          <AiOutlineDownload aria-hidden="true" /> Download CV (PDF)
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
