import React, { useState } from "react";
import { getLoginToken, forgotPasswordJourney } from "./dataCollect";
import { Modal, Button, Form } from "react-bootstrap";

import "react-tabs/style/react-tabs.css";

import { NotificationManager } from "react-notifications";

const subscribeButton = {
  backgroundColor: "#064368",
  padding: "10px 20px 10px 20px",
  marginRight: "10px"
};

function Subscribe(props) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(["", ""]);
  const [errorMessageF, setErrorMessageF] = useState([""]);

  const handleClose = function() {
    setEmail("");
    setPassword("");
    setErrorMessage(["", ""]);
    setShowLogin(true);

    setShow(false);
  };
  const handleShow = () => setShow(true);
  function handleSignIn() {
    getLoginToken(email, password)
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        if (res["error"] !== true) {
          props.updateSubscribeInfo(res);

          handleClose(false);
          NotificationManager.success("", "Login Successful");
        } else {
          setErrorMessage(res["messages"]);
        }
      })
      .catch(function(res) {
        console.log(res);
      });
  }
  function handleForgotPassword() {
    forgotPasswordJourney(forgotEmail)
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        if (res["error"] !== true) {
          handleClose();
          NotificationManager.success("", "Email Sent for updating password");
        } else {
          setErrorMessageF(res["messages"]);
        }
      })
      .catch(function(res) {
        console.log(res);
      });
  }
  let body = showLogin ? (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          key="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">{errorMessage[0]}</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          key="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Text className="text-muted">{errorMessage[1]}</Form.Text>
      </Form.Group>
      <Button
        variant="secondary"
        style={subscribeButton}
        onClick={handleSignIn}
        className="float-right"
      >
        <b>Login</b>
      </Button>
      <div>
        <a href="#" onClick={() => setShowLogin(false)}>
          Forgot Password
        </a>
      </div>
    </Form>
  ) : (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={e => setForgotEmail(e.target.value)}
        />
        <Form.Text className="text-muted">{errorMessageF[0]}</Form.Text>
      </Form.Group>
      <Button
        variant="secondary"
        style={subscribeButton}
        onClick={handleForgotPassword}
        className="float-right"
      >
        <b>Send Password Reset Link</b>
      </Button>
    </Form>
  );
  return (
    <div>
      <Button type="submit" onClick={handleShow} style={subscribeButton}>
        <b>Login</b>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="/static/logo.png" height="70" alt=""></img>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </div>
  );
}
export default Subscribe;
