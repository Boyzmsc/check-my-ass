import './App.css';
import {Component} from 'react';

import Login from './components/Login';
import Main from './components/Main';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginId : '',
      loginPwd : '',
      mode: 'welcome',
      selected_content_id: 3,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    };
  }

  render(){
    return(
      <div className="App">
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
