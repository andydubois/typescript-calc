import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { evaluate, round } from "mathjs";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";


const styles = {
  calcDisplay: {
    height: "20px",
  }
}
class CalcPad extends Component {
  state = {
    input: "",
    result: 0,
  };

  //will retrieve equation list on page load
  componentDidMount() {
    this.fetchEquations();
    //runs get every 5 seconds to check to any new entries from other users
    setInterval(this.fetchEquations, 5000)
  }

  //retrieves equation list from database
  fetchEquations = () => {
    this.props.dispatch({
      type: "FETCH_EQUATIONS",
    });
  };

  //saves input in state to be displayed on DOM
  handleInput = (event) => {
    this.setState({
      ...this.state,
      input: this.state.input + event.target.value,
    });
    console.log(this.state);
  };

  //handles clear input button
  clearInput = (event) => {
    this.setState({
      ...this.state,
      input: "",
    });
  };

  //handles backspace button, deleting one character at a time
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

  //handles the equals button functionality, evaluates whole expression entered
  evalExpression = (event) => {
    //see if there is an expresson to evaluate
    try {
      this.setState(
        {
          //rounds answer to 5 decimals points
          result: round(evaluate(this.state.input), 5),
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
        <p className={this.props.classes.calcDisplay}>{this.state.input}</p>
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
        <Button onClick={this.handleInput} value='.'>
          .
        </Button>
        <Button onClick={this.handleInput} value='*'>
          x
        </Button>
        <br />
        <Button onClick={this.evalExpression} value='='>
          =
        </Button>
        <Button onClick={this.backspace} value=''>
          Back
        </Button>
        <div>
          {this.props.store.equationReducer.map((equation) => {
            return (
              <p>
                {equation.equation} = {equation.result}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(withStyles(styles)(CalcPad));
