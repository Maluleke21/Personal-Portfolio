import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/Hlavutelo.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="accent"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a <b className="accent">Data Engineer & Software Developer</b> based in{" "}
              <b className="accent">Johannesburg, South Africa</b>. I built
              production-grade ETL/ELT pipelines at{" "}
              <b className="accent">FNB (First National Bank)</b>.
              <br />
              <br />
              I specialise in the full data lifecycle ingestion, transformation,
              integration, storage and reporting using tools like{" "}
              <i>
                <b className="accent">Ab Initio, Apache Spark, SQL and Power BI.</b>
              </i>
              <br />
              <br />
              On the software side, I'm fluent in{" "}
              <i>
                <b className="accent">Python, Java, JavaScript, C# and React</b>
              </i>
              , and I love building things that are both technically solid and
              genuinely useful.
              <br />
              <br />
              I thrive at the intersection of{" "}
              <b className="accent">data engineering, cloud platforms</b> and{" "}
              <b className="accent">software development</b> whether that's designing
              scalable data solutions on{" "}
              <i>
                <b className="accent">Azure</b>
              </i>{" "}
              or shipping full-stack web products.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="accent">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Maluleke21"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/cultivatedsava1?s=21"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/hlavutelo-denrol-maluleke-321837296"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
