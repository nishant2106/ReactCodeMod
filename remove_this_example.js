class App extends Component {
    render() {
      return (
        <div className="main">
          <Header />
          <ListContainer />
        </div>
      );
    }
  }
  
class ListContainer extends Component {
    render() {
      const no = 10;
      const fun = ()=>{return 0};
      const raw = window.localStorage.getItem("items");
      const items = raw && raw.length ? JSON.parse(raw) : [];
      return ( <List items={items} />);
    }
}
  