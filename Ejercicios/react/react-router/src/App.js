import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

const Home = () => {
  return ( <div> Home </div> );
}

const About = () => {
  return ( <div> About </div> );
}

class App extends Component {
  render(){
    return (
      <div className="App">
        Hola
        <Router>
          <Route exact path="/" Component={Home}></Route>
          <Route exact path="/home" Component={Home}></Route>
          <Route exact path="/about" Component={About}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
