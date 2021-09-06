import React, { Component } from "react";
import Little from "./Little";

class One extends Component {
  increase = () => {
    this.setState({ count: this.state.count + 1 });
    return 0;
  };
  render() {
    return (
      <div>
      <h1>ef</h1>
      </div>
    );
  }
}

export default One;