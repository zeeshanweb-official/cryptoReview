import React, { useState, useEffect } from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Card, Form } from "react-bootstrap";
import { DateTime } from "./DateController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { GetData } from "./dataCollect";
import highchartsMore from "highcharts/highcharts-more";
import Moment from "moment";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { setupOptions } from "./HighChartsOptions";
import LoadingOverlay from "react-loading-overlay";
highchartsMore(Highcharts);

const cardStyle = {
  minHeight: "15%",
};
function stripHtml(html) {
  // Create a new div element
  var temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
function extractHostname(url) {
  var hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

function updateWorkingDOMData(data, currency, range, loginStatus) {
  if (data["all_currencies"] && currency["value"] && range["value"]) {
    let workingData = data["all_currencies"][currency["value"]];

    let rangeFrom = workingData["Date"].length;
    if (range["value"] === "10 Days" || !loginStatus) {
      rangeFrom -= 10;
    } else if (range["value"] === "30 Days") {
      rangeFrom -= 30;
    } else {
      rangeFrom -= 90;
    }
    let dates = workingData["Date"].slice(Math.max(rangeFrom, 0));
    let d = workingData["reddit_index_ma"].slice(Math.max(rangeFrom, 0));
    let ma = workingData["ma"].slice(Math.max(rangeFrom, 0));
    let y1_data = workingData["Close"].slice(Math.max(rangeFrom, 0));
    let a = workingData["High"].slice(Math.max(rangeFrom, 0));
    let b = workingData["Low"].slice(Math.max(rangeFrom, 0));
    let c = a.map(function (e, i) {
      return [e, b[i]];
    });
    let setupData = {
      xdata: dates,
      y2data_ma: ma,
      y1data: y1_data,
      y1data_high_low: c,
      y3data_social_js: d,
    };
    console.log(setupData);
    return setupData;
  }
  return null;
}
function MainContent(props) {
  const [data, setData] = useState({});
  const MainContentStyle = {
    backgroundColor: "#fbfbfb",
    marginTop: "2%",
  };
  const [counter, setCounter] = useState(0);
  const [currencyDropDown, setCurrencyDropDown] = useState([]);
  const [rangeDropDown, setRangeDropDown] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [selectedRange, setSelectedRange] = useState({});

  let workingDom = updateWorkingDOMData(
    data,
    selectedCurrency,
    selectedRange,
    props.loginStatus
  );

  const noArticles = [
    <div
      style={{
        height: "50%",
        textAlign: "center",
      }}
    >
      <p>No Articles for this date</p>
    </div>,
  ];
  const [articles, setArticles] = useState(noArticles);

  let articleDictionary = {};

  // One time effort of data update
  if (data.articles) {
    for (let i = 0; i < data.xdata.length; i++) {
      articleDictionary[data.xdata[i]] = data.articles[i];
    }
    if (counter === 0) {
      if (data) updateArticles(new Date());
      setCounter(counter + 1);
      let currencyArray = [];
      let d = {
        BTC: "BitCoin",
        BCH: "Bitcoin Cash",
        DOGE: "Dogecoin",
        ETH: "Ethereum",
        LTC: "Litecoin",
        TRX: "Tron",
        ZRX: "0x",
      };
      for (let x in data["all_currencies"]) {
        currencyArray.push({ value: x, label: d[x] });
      }
      let rangeArray = ["10 Days", "30 Days", "90 Days"];

      setCurrencyDropDown(
        <Dropdown
          options={currencyArray}
          className="col-md-12 col-12 button-rounded"
          value={currencyArray[0]}
          onChange={(x) => setSelectedCurrency(x)}
          placeholder="Select an option"
          style={{ padding: "0px" }}
        />
      );
      setSelectedCurrency(currencyArray[0]);
      setRangeDropDown(
        <Dropdown
          className="col-md-12 col-12"
          options={rangeArray}
          value={rangeArray[0]}
          onChange={(x) => setSelectedRange(x)}
          placeholder="Select an option"
          style={{ padding: "0px" }}
        />
      );

      setSelectedRange({ value: rangeArray[0] });
    }
  }

  function updateArticles(dateObj) {
    console.log("render happending");
    let newdate = Moment(dateObj).format("YYYY-MM-DD");
    let arr = [];

    if (articleDictionary[newdate]) {
      for (let i = 0; i < Math.min(articleDictionary[newdate].length, 2); i++) {
        arr.push(
          <Card style={cardStyle} className="box-shaddow">
            <Card.Header>
              {stripHtml(articleDictionary[newdate][i][0][0])}
              <div
                style={{
                  fontSize: "12px",
                  paddingTop: "5px",
                  minHeight: window.innerHeight * 0.05,
                }}
              >
                <a href={articleDictionary[newdate][i][1][0]} target="_blank">
                  <FontAwesomeIcon icon={faLink} />
                  {"  " + extractHostname(articleDictionary[newdate][i][1][0])}
                </a>
              </div>
            </Card.Header>
          </Card>
        );
        arr.push(
          <Card style={cardStyle} className="box-shaddow">
            <Card.Header>
              {stripHtml(articleDictionary[newdate][i][0][1])}
              <div
                style={{
                  fontSize: "12px",
                  paddingTop: "5px",
                  minHeight: window.innerHeight * 0.05,
                }}
              >
                <a href={articleDictionary[newdate][i][1][1]} target="_blank">
                  <FontAwesomeIcon icon={faLink} />
                  {"  " + extractHostname(articleDictionary[newdate][i][1][1])}
                </a>
              </div>
            </Card.Header>
          </Card>
        );
      }
    }
    if (arr.length === 0) arr = noArticles;
    setArticles(arr);
  }
  useEffect(() => {
    GetData()
      .then((response) => {
        let t = response.json();

        return t;
      })
      .then((d) => {
        console.log(d);
        setData(d);
      })
      .catch((e) => {
        console.log(e);
        console.log("error occured in fetching data");
      });
  }, []);

  const options = setupOptions(workingDom, selectedCurrency);
  let rangeDropDownCheck = props.loginStatus ? (
    <Col xs="12" md="3">
      <Form.Label>
        <b>Select Range</b>
      </Form.Label>
      {rangeDropDown}
    </Col>
  ) : (
      ""
    );
  return (
    <div className="px-5" style={{ marginTop: "-20px" }}>
      <LoadingOverlay
        active={!data.articles}
        spinner
        text="Loading data"
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(6, 67, 104, 0.1)",
            color: "black",
          }),
        }}
      >
        <Row style={MainContentStyle}>
          <Col md="8" xs="12">
            <Row style={{ marginLeft: "2%" }}>
              <Col xs="12" md="3">
                <Form.Label>
                  <b>Select Currency</b>
                </Form.Label>
                {currencyDropDown}
              </Col>
              {rangeDropDownCheck}
            </Row>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </Col>
          <Col md="4" xs="12">
            <Row>
              <Col xs="12">
                <b>Articles</b>
              </Col>
              <Col xs="12" style={{ padding: "0px" }}>
                <DateTime updateFunction={updateArticles} />
              </Col>
            </Row>
            <div style={{ marginTop: "5%" }}>{articles}</div>
          </Col>
        </Row>
      </LoadingOverlay>
    </div>
  );
}
export default MainContent;
