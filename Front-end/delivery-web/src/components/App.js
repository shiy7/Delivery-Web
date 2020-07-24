import React, {Component} from 'react';
import '../styles/App.css';
import TopBar from './TopBar';
import Main from './Main';

import { TOKEN_KEY } from '../constants';


class App extends Component{
  state = {
    isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
      userID: String()
  }

  handleLoginSucceed = (token, userID, password) => {
    console.log('token --- ', token)
    localStorage.setItem(TOKEN_KEY, token)
      // user.authdata =
      // localStorage.setItem("user",)user

    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.setState({ isLoggedIn: false });
  }

  render(){
    return (
        <div className="App">
          <TopBar handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
          />

          <Main
              handleLoginSucceed={this.handleLoginSucceed}
              isLoggedIn={this.state.isLoggedIn}
          />
        </div>
    );
  }
}

export default App;