import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import "./scss/root.scss";

import Main from './pages/Main';
import Auth from './services/auth'
import Database from './services/database';

// const auth = new Auth();
// const database = new Database();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
      {/* <App auth={auth} database={database} /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
