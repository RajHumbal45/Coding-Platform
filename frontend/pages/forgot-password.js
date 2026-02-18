import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "../src/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setToken("");
    setLoading(true);

    try {
      const response = await forgotPassword({ email });
      setMessage(response.message || "Reset instructions generated.");
      setToken(response.resetToken || "");
    } catch (err) {
      setError(err.message || "Failed to generate reset token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Recover Access</p>
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">Enter your email to generate reset instructions.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          {error ? <p className="error-text">{error}</p> : null}
          {message ? <p className="status-text">{message}</p> : null}
          {token ? <p className="status-text">Reset Token: <code>{token}</code></p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Reset Token"}
          </button>
        </form>

        <div className="auth-links-row">
          <Link href="/reset-password">Go to reset form</Link>
          <Link href="/login">Back to login</Link>
        </div>
      </section>
    </main>
  );
}
