import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "./Context/AuthContext";
import {Link, useHistory} from "react-router-dom";

import "./Login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="login-card p-2 mb-5">
        <Card.Body className="login-card-body">
          <h2 className="login-title text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="email-label">Email</Form.Label>
              <Form.Control
                className="email-input"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control
                className="password-input"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="login-btn w-100 text-center"
              type="submit"
            >
              Login
            </Button>
          </Form>
          <div className="login-footer">
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="signup-text w-100 text-center mt-2">
              Need an account? &nbsp;<Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
