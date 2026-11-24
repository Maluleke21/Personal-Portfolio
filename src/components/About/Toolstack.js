import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiJira,
  SiConfluence,
  SiGithub,
  SiBitbucket,
  SiJupyter,
  SiFigma,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons" title="VS Code">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Jupyter Notebook">
        <SiJupyter />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Postman">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="GitHub">
        <SiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Bitbucket">
        <SiBitbucket />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="JIRA">
        <SiJira />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Confluence">
        <SiConfluence />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Figma">
        <SiFigma />
      </Col>
    </Row>
  );
}

export default Toolstack;
