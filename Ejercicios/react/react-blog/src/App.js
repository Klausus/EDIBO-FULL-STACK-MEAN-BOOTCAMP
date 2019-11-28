import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from './Components/Home';
import BlogList from './Components/BlogList';
import BlogCreate from './Components/BlogCreate';
import BlogItem from './Components/BlogItem';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>

          {/*  Crear la ruta a Home */}
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/home" component={Home}></Route>

          {/* Crear la ruta a BlogList /blog */}
          <Route exact path="/blog" component={BlogList}></Route>

          <Switch>
            {/* Crear la ruta a Blog Create en /blog/create */}
            <Route exact path = "/blog/create" component={BlogCreate}></Route>

            {/* Crear la ruta a Blog Create en /blog/create */}
            <Route exact path = "/blog/:id/" component={BlogItem}></Route>
          </Switch>
          
        </Router>
      </div>
    );
  }
}

export default App;
