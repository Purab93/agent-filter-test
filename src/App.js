import React from 'react';
import './App.css';
import Part1 from './part1';
import Part2 from './part2';
import Home from './home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router history={this.props.history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/part1" component={Part1}/>
                <Route exact path="/part2" component={Part2}/>
            </Switch>
        </Router>
      </div>
    );
  }
}
