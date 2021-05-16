import './App.css';
import {Component} from 'react';

import Header from './components/Header'
import Login from './components/Login';
import Main from './components/Main';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginId : '',
      loginPwd : '',
      mode: 'login',
      assignment: []
    };
  }

  render(){
    return(
      <div className="App">
        <Header></Header>
        <Login
          onSubmit={function (l_id, l_pwd) {
            this.setState({
              loginId : l_id,
              loginPwd : l_pwd
            })
          }.bind(this)}>
        </Login>
      </div>
    );
  }
}

export default App;
