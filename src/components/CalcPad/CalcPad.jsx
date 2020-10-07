import React, { Component } from "react";
import { Button } from "react-bootstrap";

class CalcPad extends Component {
  state = {
    input: "",
    equation: "",
  };

  handleInput = (event) => {
    this.setState({
      ...this.state,
      input: this.state.input + event.target.value,
    });
    console.log(this.state);
  };

  clearInput = (event) => {
      this.setState({
          ...this.state,
          input: "",
      })
  }

  backspace = event => {
      try {
          this.setState({
              input: this.state.input.slice(0,-1)
          });
      } catch (error) {
          this.setState({
              input: "ERROR"
          });
      }
  };

  evaluate = event => {

  }
  render() {
    return (
      <div>
        <p>{this.state.input}</p>
        <Button onClick={this.handleInput} value='1'>
          1
        </Button>
        <Button onClick={this.handleInput} value='2'>
          2
        </Button>
        <Button onClick={this.handleInput} value='3'>
          3
        </Button>
        <Button onClick={this.handleInput} value='+'>
          +
        </Button>
        <br />
        <Button onClick={this.handleInput} value='4'>
          4
        </Button>
        <Button onClick={this.handleInput} value='5'>
          5
        </Button>
        <Button onClick={this.handleInput} value='6'>
          6
        </Button>
        <Button onClick={this.handleInput} value='-'>
          -
        </Button>
        <br />
        <Button onClick={this.handleInput} value='7'>
          7
        </Button>
        <Button onClick={this.handleInput} value='8'>
          8
        </Button>
        <Button onClick={this.handleInput} value='9'>
          9
        </Button>
        <Button onClick={this.handleInput} value='/'>
          ÷
        </Button>
        <br />
        <Button onClick={this.clearInput} value=''>
          C
        </Button>
        <Button onClick={this.handleInput} value='0'>
          0
        </Button>
        <Button onClick={this.handleInput} value='='>
          =
        </Button>
        <Button onClick={this.handleInput} value='*'>
          x
        </Button>
        <br />
        <Button onClick={this.handleInput} value=''>
            Back
        </Button>
      </div>
    );
  }
}

export default CalcPad;
