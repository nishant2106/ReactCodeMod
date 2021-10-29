import React, { Component } from "react";

class Three extends Component {
  state = {
    year: 1995,
    type: "Mercedes",
    used: true
  };
  
  swapCar = () => {
    this.setState({
      year: 2018,
      type: "BMW",
      used: false
    });
  };
  swapCar2 = () => {
    this.setState({
      year: 2019,
      type: "BMW",
      used: false
    });
  };

/*
  const swapCar = () => {
    changeYear(2018);
    changeType("BMW");
    changeCondition(false);
  };
*/

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
        <button onClick={this.swapCar}>{this.props.car}</button>
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
        <button onClick={this.swapCar}>{this}</button>
      </div>
    );
  }
}

export default Three;