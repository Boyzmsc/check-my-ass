/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {useAuth} from "../../components/Login/Context/AuthContext";
import {useHistory} from "react-router";
import {firestore} from "../../services/firebase";
import {Toast} from "react-bootstrap";
import {Form} from "react-bootstrap";
import axios from "axios";

import "./MainHeader.scss";

import {FaSyncAlt, FaSignOutAlt} from "react-icons/fa";

export default function MainHeader() {
  const [toastText, setToastText] = useState("");
  const [univ, setUniv] = useState("Kookmin University");
  const [show, setShow] = useState(false);
  const {currentUser, logout} = useAuth();
  const history = useHistory();
  const userId = currentUser.uid;

  const univ_list = {
    "Kookmin University": "KMU",
    // "Seoul National University": "SNU",
    // "Yonsei University": "YONSEI",
    // "Korea University": "KOREA",
    // "Sungkyunkwan University": "SKKU",
  };

  const univ_items = [];
  for (var i = 0; i < Object.keys(univ_list).length; i++) {
    var key = Object.keys(univ_list)[i];
    univ_items.push(key);
  }

  async function handleLogout() {
    await logout();
    history.push("/login");
  }

  function updateDB(u, id, pwd) {
    if (id === "" || pwd === "") {
      setToastText("Login Failed! Please Retry Crawling!");
      setShow(true);
    } else {
      // Fetch data & Reset firestore
      setToastText("Crawling Start! Please Wait A Few Seconds...");
      setShow(true);
      axios
        .post("http://localhost:5000/api", {
          univ: u,
          loginId: id,
          loginPwd: pwd,
        })
        // axios
        //   .post("https://cmaserver.herokuapp.com/api", {
        //     univ: u,
        //     loginId: id,
        //     loginPwd: pwd,
        //   })
        .then((res) => {
          let data = res.data;
          if (data[0].length == 0 || data[1].length == 0) {
            setToastText("Crawling Failed! Please Retry Crawling!");
            setShow(true);
          } else if (data !== false) {
            // Delete & Store lecture
            firestore
              .collection("users")
              .doc(userId)
              .collection("lec")
              .get()
              .then((res) => {
                res.forEach((el) => {
                  el.ref.delete();
                });
              })
              .then(() => {
                for (var i = 0; i < data[0].length; i++) {
                  firestore
                    .collection("users")
                    .doc(userId)
                    .collection("lec")
                    .add(data[0][i]);
                }
              })
              .then(() => {
                // Delete & Store assignment
                firestore
                  .collection("users")
                  .doc(userId)
                  .collection("ass")
                  .get()
                  .then((res) => {
                    res.forEach((el) => {
                      el.ref.delete();
                    });
                  })
                  .then(() => {
                    for (var i = 0; i < data[1].length; i++) {
                      firestore
                        .collection("users")
                        .doc(userId)
                        .collection("ass")
                        .add(data[1][i]);
                    }
                  })
                  .then(() => {
                    setToastText("Complete Crawling! Please Reload Page!");
                    setShow(true);
                  });
              });
          } else {
            setToastText("Login Failed! Please Retry Crawling!");
            setShow(true);
          }
        });
    }
  }

  return (
    <nav class="main-navbar navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <p></p>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="/"
              role="button"
              aria-expanded="false"
            />
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  class="dropdown-item"
                  href="#login-modal"
                  data-bs-toggle="modal"
                >
                  <FaSyncAlt className="sync-icon" />
                  Sync
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0);"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="logout-icon" />
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Login toast */}
      <div
        in={show}
        class="position-fixed bottom-0 end-0 p-3 me-3"
        style={{zIndex: "11"}}
      >
        <Toast
          className="login-toast"
          bg="light"
          onClose={() => setShow(false)}
          animation={true}
          show={show}
          delay={6000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Notice</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>{toastText}</Toast.Body>
        </Toast>
      </div>

      {/* Login modal */}
      <div
        class="modal fade"
        id="login-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="login-modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <form
              method="post"
              onSubmit={function (e) {
                e.preventDefault();
                updateDB(
                  univ_list[univ],
                  e.target.id.value,
                  e.target.password.value,
                );
              }.bind(this)}
            >
              <div class="modal-header">
                <h5 class="modal-title">LOGIN</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="mb-1">
                  <label for="input-univ" class="col-form-label">
                    University
                  </label>
                  <Form.Select
                    id="input-univ"
                    onChange={(e) => setUniv(e.currentTarget.value)}
                  >
                    {univ_items.map((univ) => (
                      <option key={univ} value={univ}>
                        {univ}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div class="mb-1">
                  <label for="input-id" class="col-form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="input-id"
                    name="id"
                  />
                </div>
                <div class="mb-3">
                  <label for="input-pwd" class="col-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="input-pwd"
                    name="password"
                  ></input>
                </div>
                <button
                  type="submit"
                  class="login-btn btn btn-dark mt-2"
                  data-bs-dismiss="modal"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
