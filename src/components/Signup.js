import React, { useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { getSignUp } from "./dataCollect";
import { NotificationManager } from "react-notifications";
const subscribeButton = {
  backgroundColor: "#064368",
  padding: "10px 20px 10px 20px",
  marginRight: "10px"
};

export function Signup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sFirstName, setSFirstName] = useState("");
  const [sLastName, setSLastName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassoword, setSPassword] = useState("");
  const [sConfirmPassword, setSConfirmPassword] = useState("");
  const [sCaptcha, setSCaptcha] = useState("");
  const [signUpError, setSignUpError] = useState(["", "", "", "", "", "", ""]);
  function handleSignUp() {
    getSignUp(
      sFirstName,
      sLastName,
      sEmail,
      sPassoword,
      sConfirmPassword,
      sCaptcha
    )
      .then(function(res) {
        return res.json();
      })
      .then(function(res) {
        console.log(res);
        if (res["error"]) {
          setSignUpError(res["messages"]);
        } else {
          setSignUpError(["", "", "", "", "", ""]);
          handleClose();
          NotificationManager.success(
            "",
            "For verification, an email has been sent to your account!"
          );
        }
        window.grecaptcha.reset();
      })
      .catch(function(e) {
        console.log(e);
      });
  }
  return (
    <div>
      <Button type="submit" style={subscribeButton} onClick={handleShow}>
        <b>Signup</b>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="/static/logo.png" height="70" alt=""></img>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter First Name"
                key="signUpFirstName"
                onChange={function(e) {
                  setSFirstName(e.target.value);
                }}
              />
              <Form.Text className="text-muted">{signUpError[0]}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter Last Name"
                key="signUpLastName"
                onChange={function(e) {
                  setSLastName(e.target.value);
                }}
              />
              <Form.Text className="text-muted">{signUpError[1]}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                onChange={function(e) {
                  setSEmail(e.target.value);
                }}
              />
              <Form.Text className="text-muted">{signUpError[2]}</Form.Text>
            </Form.Group>
          </Form>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={function(e) {
                setSPassword(e.target.value);
              }}
            />
            <Form.Text className="text-muted">{signUpError[3]}</Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={function(e) {
                setSConfirmPassword(e.target.value);
              }}
            />
            <Form.Text className="text-muted">{signUpError[4]}</Form.Text>
          </Form.Group>
          <Form.Group>
            <ReCAPTCHA
              sitekey="6LcXqOAUAAAAANvtogmWA5n7jdsq1tZU8Jlgl-fG"
              onChange={setSCaptcha}
            />
            <Form.Text className="text-muted">{signUpError[5]}</Form.Text>
          </Form.Group>
          <Button
            variant="secondary"
            style={subscribeButton}
            className="float-right"
            onClick={handleSignUp}
          >
            <b>Sign Up</b>
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
