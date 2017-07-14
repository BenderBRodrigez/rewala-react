import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Menu from './Menu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={process.env.PUBLIC_URL + '/assets/logo.svg'} className="App-logo" alt="logo" />
          <h2>Title</h2>
        </header>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton tooltip="blablabla"><NavigationClose /></IconButton>}
          zDepth={2}
        />
        <main>
          <Menu />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
