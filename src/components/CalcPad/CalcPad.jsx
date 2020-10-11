import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { evaluate, round } from "mathjs";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  calcDiv: {
    // width: "20%",
    // height: "50%",
    margin: "0 auto",
    backgroundColor: "#5f6769",
    borderRadius: "15px",
    textAlign: "center",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  calcDisplay: {
    height: "60px",
    width: "100%",
    margin: "0 auto",
    fontSize: "1.9rem",
    backgroundColor: "black",
    color: "#ffffff",
    borderRadius: "15px",
    marginBottom: "10px",
    fontFamily: "calculator"
  },
  numButtons: {
    margin: "2px",
    width: "80px",
    // height: "25px",
    fontSize: "1.3rem",
    borderColor: "purple",
    border: "thick",
    textAlign: "center",
    backgroundColor: "#6700ff",
  },
  equalsButton: {
    margin: "1px",
    width: "192px",
    backgroundColor: "#6700ff",
    border: "thick",
  },
  backButton: {
    margin: "1px",
    width: "138px",
    textAlign: "center",
    paddingLeft: "3px",
    paddingRight: "3px",
    backgroundColor: "#6700ff",
    border: "thick",
  },
  equationList: {
    textAlign: "center",
    backgroundColor: "rgb(95,103,105, .9)",
  },
};
class CalcPad extends Component {
  state = {
    input: 0,
    result: 0,
  };

  //will retrieve equation list on page load
  componentDidMount() {
    this.fetchEquations();
    // runs get every 5 seconds to check to any new entries from other users
    setInterval(this.fetchEquations, 5000);
  }

  //retrieves equation list from database
  fetchEquations = () => {
    this.props.dispatch({
      type: "FETCH_EQUATIONS",
    });
  };

  //saves input in state to be displayed on DOM
  handleInput = (event) => {
    if (this.state.input === 0) {
      this.setState({
        ...this.state,
        input: event.target.value,
      });
    } else {
      this.setState({
        ...this.state,
        input: this.state.input + event.target.value,
      });
    }

    console.log(this.state);
  };

  //handles clear input button
  clearInput = (event) => {
    this.setState({
      ...this.state,
      input: 0,
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
        <div className={this.props.classes.calcDiv}>
          <h2>Calculator 2020</h2>
          <p className={this.props.classes.calcDisplay}>{this.state.input}</p>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='1'>
            1
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='2'>
            2
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='3'>
            3
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='+'>
            +
          </Button>
          <br />
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='4'>
            4
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='5'>
            5
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='6'>
            6
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='-'>
            -
          </Button>
          <br />
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='7'>
            7
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='8'>
            8
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='9'>
            9
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='/'>
            ÷
          </Button>
          <br />
          <Button
            className={this.props.classes.numButtons}
            onClick={this.clearInput}
            value=''>
            C
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='0'>
            0
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='.'>
            .
          </Button>
          <Button
            className={this.props.classes.numButtons}
            onClick={this.handleInput}
            value='*'>
            x
          </Button>
          <br />
          <Button
            className={this.props.classes.backButton}
            onClick={this.backspace}
            value=''>
            Back
          </Button>
          <Button
            className={this.props.classes.equalsButton}
            onClick={this.evalExpression}
            value='='>
            =
          </Button>
        </div>
        <div className={this.props.classes.equationList}>
          <h2>Past Equations</h2>
          {this.props.store.equationReducer.map((equation) => {
            return (
              <>
                <p>
                  {equation.equation} = {equation.result}
                </p>
              </>
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
