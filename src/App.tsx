import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './page/Home';
import PageA from './page/A';
import PageB from './page/B';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pageA" component={PageA} />
            <Route path="/pageB" component={PageB} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
