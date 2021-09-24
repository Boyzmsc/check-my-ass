import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "./Context/AuthContext";
import {Link} from "react-router-dom";

import "./ForgotPassword.scss";

export default function ForgotPassword() {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="forgot-password-card p-2 mb-5">
        <Card.Body className="forgot-password-card-body">
          <h2 className="forgot-password-title text-center mb-4">
            Password Reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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
            <Button
              disabled={loading}
              className="forgot-password-btn w-100 text-center"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="forgot-password-footer">
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login?</Link>
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
