import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiApachespark,
  SiMicrosoftazure,
  SiPowerbi,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiMysql,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons" title="Python">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Apache Spark">
        <SiApachespark />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="SQL / MySQL">
        <SiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="PostgreSQL">
        <SiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Microsoft Azure">
        <SiMicrosoftazure />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Power BI">
        <SiPowerbi />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Docker">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Kubernetes">
        <SiKubernetes />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="JavaScript">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="React">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Java">
        <DiJava />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="C#">
        <TbBrandCSharp />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Node.js">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Git">
        <DiGit />
      </Col>
    </Row>
  );
}

export default Techstack;
