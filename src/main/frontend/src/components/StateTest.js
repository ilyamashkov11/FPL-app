import React, { Component } from "react";

class StateTest extends Component {
  constructor() {
    super();
    this.state = {
      message: "Welcome Visitor",
      count: 0
    };
  }

  render() {
    return (
      <div>
        <h1>This is a state test: {this.state.count}</h1>
        <button onClick={() => {this.setState({count: this.state.count+5})}}></button>
      </div>
    );
  }
}
export default StateTest;
