import React from "react";
import { Card, Container, Row, Col } from "reactstrap";
import Header from "components/Headers/Header.js";

const Maps = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow border-0 p-4">
              <h2 className="mb-4">About AIOTKnows Me</h2>
              <p>
                AIOTKnows Me is a platform dedicated to exploring the intersection of AI (Artificial Intelligence),
                IoT (Internet of Things), and knowledge discovery. We strive to provide insights, resources, and
                solutions at the nexus of these rapidly evolving technologies.
              </p>
              <p>
                Our mission is to empower individuals and businesses with the knowledge and tools necessary to harness
                the full potential of AI and IoT, driving innovation, efficiency, and progress in various domains.
              </p>
              <h3 className="mt-5">Our Team</h3>
              <p>
                At AIOTKnows Me, we are proud to have a diverse team of experts in AI, IoT, data science, and related
                fields. Our team members are passionate about leveraging cutting-edge technologies to tackle complex
                challenges and create impactful solutions.
              </p>
              <p>
                Together, we are dedicated to pushing the boundaries of what is possible, driving forward the frontier
                of AI and IoT applications, and shaping a future where intelligent technologies enhance lives and
                transform industries.
              </p>
              <h3 className="mt-5">Contact Us</h3>
              <p>
                We would love to hear from you! Whether you have questions, feedback, or collaboration opportunities,
                feel free to reach out to us.
              </p>
              <p>
                Email: contact@aiotknowsme.com <br />
                Phone: +1 (123) 456-7890
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
