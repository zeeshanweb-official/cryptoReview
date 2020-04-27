import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
function addDays(theDate, days) {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

export function DateTime(props) {
  const [date, setDate] = useState(new Date());
  function increment() {
    updateAll(addDays(date, 1));
  }
  function decrement() {
    updateAll(addDays(date, -1));
  }
  function updateAll(date) {
    if (props.updateFunction) {
      props.updateFunction(date);
    }
    setDate(date);
  }

  return (
    <div className="col-12 mt-1">
      <Row>
        <Col md="12" className="px-0">
          <Button
            variant="outline-info"
            onClick={decrement}
            className="arrow-buttons border-0 box-shaddow mr-1"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          <DatePicker onChange={updateAll} value={date} maxDate={new Date()} />
          <Button
            variant="outline-info"
            className="arrow-buttons border-0 box-shaddow ml-1"
            onClick={increment}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
        </Col>
        <Col md="1" className="text-left px-0 ml-2">

        </Col>
      </Row>
    </div>
  );
}
