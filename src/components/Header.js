import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Subscribe from "./Subscribe";
import { Signup } from "./Signup";
import Logo from "../assets/logoWithoutText.svg"
const buttonStyles = {
  padding: "10px 20px 10px 20px",
  marginRight: "10px"
};

function Header(props) {
  let subscribe = props.loginStatus ? (
    <Button variant="light" onClick={props.disableInfo}>
      <b>Logout</b>
    </Button>
  ) : (
      <>
        <Subscribe updateSubscribeInfo={props.updateSubscribeInfo} />
        <Signup />
      </>
    );
  return (
    <div className="px-3">
      <Navbar
        expand="sm"
        height="10%"
        style={{
          borderBottom: "solid lightgrey 1px"
        }}
      >
        <Navbar.Brand href="#home">
          <img src={Logo} width="250" height="65" alt=""></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home" style={buttonStyles}>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link
              href="https://www.cryptoreview.ai/cryptocurrency/"
              style={buttonStyles}
            >
              <b>Blog</b>
            </Nav.Link>

            {subscribe}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
