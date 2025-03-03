import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Empower SME"
              description="Web platform that recruits students for work opportunities.
               It likely connects students with job opportunities,
                streamlining the hiring process for employers while making it easier for students to find relevant work.
                 The app might include features such as job listings, applications,
               employer-student matching, and possibly integrated communication or payment options."
              demoLink="https://empowersme.onrender.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Calculator"
              description="My Calculator App is a digital tool designed to perform mathematical calculations efficiently.
               It likely includes basic arithmetic operations (addition, subtraction,
                multiplication, division) and may have additional features such as scientific functions,
                 a history log, or a user-friendly interface for ease of use"
              ghLink="https://github.com/Maluleke21/MyCalculator_gui.git"  
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="My To-Do-List"
              description="My To-Do List App is a productivity tool designed to help users efficiently manage their tasks.
               It likely includes features such as task creation, editing, deletion, due dates, and possibly categorization or priority levels.
               The app may also support reminders, progress tracking, or cloud synchronization for accessibility across devices."
              ghLink="https://github.com/Maluleke21/My-To-do-List-app.git"              
            />
          </Col>

          //<Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves.
               The model was successfully able to detect diseased and healthy leaves of 14 unique plants.
                I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
             
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
