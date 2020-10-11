import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//components
import CalcPad from "../CalcPad/CalcPad";

function App() {
  return (
    <>
      <header>Calculator 2020</header>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <CalcPad />
          </Col>
          <Col></Col>
        </Row>
      </Container>

      <div className='App'></div>
    </>
  );
}

export default App;
