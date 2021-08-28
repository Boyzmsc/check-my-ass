import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "./Context/AuthContext";
import {Link, useHistory} from "react-router-dom";

import "./Signup.scss";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup, currentUser} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="signup-card p-2 mb-5">
        <Card.Body className="signup-card-body">
          <h2 className="signup-title text-center mb-4">Sign Up</h2>
          {/* To know signed up email
          {currentUser.email} */}
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
            <Form.Group id="password-confirm">
              <Form.Label className="password-confirm-label">
                Password Confirmation
              </Form.Label>
              <Form.Control
                className="password-confirm-input"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="login-btn w-100 text-center"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          <div className="signup-footer">
            <div className="signup-text w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
