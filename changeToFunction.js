class LoginApp extends Component{
 
  render() {
    const no = 10;
    const fun = ()=>{return 0};
    const raw = window.localStorage.getItem("items");
    const items = raw && raw.length ? JSON.parse(raw) : [];
    
    return ( <div>{this.props.name}</div>);
  }
  

}