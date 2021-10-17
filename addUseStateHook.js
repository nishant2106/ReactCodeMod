class Three extends Component {
  swapCar = () => {
    this.setState({
      year: 2018,
      type: "BMW",
      used: false
    });
  };

   const [year,yearSetter]=useState('1995');
  const [type,typeSetter]=useState('Mercedes');
  const [used,usedSetter]=useState('true');


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
}class four extends Component {
  const [year,yearSetter]=useState('2000');
  const [type,typeSetter]=useState('Audi');
  const [used,usedSetter]=useState('true');


  swapCar = () => {
    this.setState({
      year: 2018,
      type: "BMW",
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