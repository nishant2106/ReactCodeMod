import React, { Component } from "react";

class Three extends Component {
  state = {
    year: 1995,
    type: "Mercedes",
    used : true,
  };
  swapCar = () => {
    this.setState({
      year: 2017,
      type: "BMW",
      used : true,
    });
  };
  swapCar2 = () => {
    this.setState({
      year: 2019,
      type: "BMW",
      used : true,
    });
  };


  render() {
    return (
      <div style={{ marginBottom: "50px" }}>
        <h2>Challenge 3</h2>
        <h3>Car Spec is:</h3>
        <ul>
          <li>{this.state.type}</li>
          <li>{this.state.year}</li>
        </ul>
        <button onClick={this.swapCar}>Swap Car!</button>
      </div>
    );
  }
}

class Four extends Component {
  state = {
    year: 1996,
    type: "BMW",
    used: true
  };
  swapCar = () => {
    this.setState({
      year: 2011,
      type: "Audi",
      used: false
    });
  };

  render() {
    return (
      <div style={{ marginBottom: "50px" }}>
        <h2>Challenge 3</h2>
        <h3>Car Spec is:</h3>
        <ul>
          <li>{this.state.type}</li>
          <li>{this.state.year}</li>
          <li>{this.state.used ? "Used Car" : "Brand New!"}</li>
        </ul>
        <button onClick={this.swapCar}>Swap Car!</button>
      </div>
    );
  }
}

export default Three;