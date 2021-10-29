class Three extends Component {
   const [year,yearSetter]=useState(1995);
  const [type,typeSetter]=useState("Mercedes");
  const [used,usedSetter]=useState(true);


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
        <button onClick={this.swapCar}>Swap Car!</button>
      </div>
    );
  }
}class Four extends Component {
  const [year,yearSetter]=useState(1996);
  const [type,typeSetter]=useState("BMW");
  const [used,usedSetter]=useState(true);


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