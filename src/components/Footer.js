import React from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const footerStyle = {
  backgroundColor: "#064368",
};
const linkStyle = {
  color: "white",
  textAlign: "center",
};
function Footer() {
  return (
    <Navbar style={footerStyle}>
      <Nav className="col-12">
        <Row className="mx-auto col-12">
          <Col xs="12" md="3">
            <Nav.Link href="/terms.html" style={linkStyle}>
              <b>Terms & Conditions</b>
            </Nav.Link>
          </Col>
          <Col xs="12" md="3">
            <Nav.Link href="/sitemap.xml" style={linkStyle}>
              <b>Sitemap</b>
            </Nav.Link>
          </Col>
          <Col xs="12" md="3">
            <Nav.Link href="#home" style={linkStyle}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              <b>info@cryptoreview.ai</b>
            </Nav.Link>
          </Col>
          <Col xs="12" md="3">
            <Nav.Link href="#home" style={linkStyle}>
              <FontAwesomeIcon
                icon={faTwitter}
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              <b>@cryptoreview_ai</b>
            </Nav.Link>
          </Col>
        </Row>
      </Nav>
    </Navbar>
  );
}
export default Footer;
