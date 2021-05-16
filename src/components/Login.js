import { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form action = "/create_process" method = "post" class = "login-form"
          onSubmit = {function (e){
            this.props.onSubmit(
              e.target.inputId.value,
              e.target.inputPwd.value
            );
          }.bind(this)}
        >
          <div class = "login-section">
            <h2>Login</h2>
            <p><input type = "text" name = "inputUniv" class = "loginUniv" placeholder="대학교"></input></p>
            <p><input type = "text" name = "inputId" class = "loginId" placeholder="아이디"></input></p>
            <p><input type = "password" name = "inputPwd" class = "loginPwd" placeholder = "비밀번호"></input></p>
            <p><input type = "submit" class = "loginBtn" value = "로그인"></input></p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;