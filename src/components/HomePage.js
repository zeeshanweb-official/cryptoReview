import React, { useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
import { Row, Col } from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import "./style.css"
import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";
function HomePage() {
  const [token, setToken] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  console.log(token);
  function updateSubscribeInfo(tokenInfo) {
    setLoginStatus(true);
    setToken(tokenInfo);
  }
  function disableInfo() {
    setLoginStatus(false);
    setToken({});
    NotificationManager.success("Success message", "You have been loged out!");
  }
  return (
    <div>
      <NotificationContainer />
      <Row className="no-gutters">
        <Col xs="12">
          <Header
            updateSubscribeInfo={updateSubscribeInfo}
            loginStatus={loginStatus}
            disableInfo={disableInfo}
          />
        </Col>
        <Col xs="12">
          <MainContent loginStatus={loginStatus} />
        </Col>
        <Col xs="12" style={{ marginTop: "2%" }}>
          <Footer />
        </Col>
      </Row>
    </div>
  );
}
export default HomePage;
