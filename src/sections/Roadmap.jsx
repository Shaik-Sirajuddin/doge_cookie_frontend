import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Roadmap() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <div className="d-flex flex-column align-items-center">
            <p>Roadmap</p>
            <img
              src="/images/doge-cookie.png"
              alt="headset"
              className="img-fluid"
              style={{ width: '24px', height: '16px', objectFit: 'contain' }}
            />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <div className="d-flex flex-column align-items-center">
            <p>Visit our white paper</p>
            <div className="d-flex justify-content-center">
              <a
                href={require("../assets/doge-cookie-logo.png")}
                download="myFile"
                className="btn btn-primary"
              >
                Download file
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Roadmap;
