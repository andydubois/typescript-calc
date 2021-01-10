import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
//components
import CalcPad from "../CalcPad/CalcPad";

function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <CalcPad />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
