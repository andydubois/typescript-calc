import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { evaluate } from "mathjs";
import {connect} from "react-redux"

class CalcPad extends Component {
  state = {
    input: "",
    result: 0,
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
    });
  };

  backspace = (event) => {
    try {
      this.setState({
        input: this.state.input.slice(0, -1),
      });
    } catch (error) {
      this.setState({
        input: "ERROR",
      });
    }
  };

  evalExpression = (event) => {
    //see if there is an expresson to evaluate
    try {
      this.setState(
        {
          result: evaluate(this.state.input),
        },
        //set this function up to make sure that result is changed in state BEFORE the payload is sent to the saga, but before input is evaluated
        function () {
          this.props.dispatch({
            type: "NEW_EQUATION",
            payload: this.state,
          });
          this.setState({
            input: evaluate(this.state.input),
          });
        }
      );
      //if there is an invalid expression "error" will be displayed
    } catch (error) {
      this.setState({
        input: "ERROR",
      });
    }
  };

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
        <Button onClick={this.evalExpression} value='='>
          =
        </Button>
        <Button onClick={this.handleInput} value='*'>
          x
        </Button>
        <br />
        <Button onClick={this.backspace} value=''>
          Back
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(CalcPad);
