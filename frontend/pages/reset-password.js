import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "../src/api/client";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ token: "", newPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await resetPassword(form);
      setMessage(response.message || "Password updated");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Reset Password</p>
        <h1>Set New Password</h1>
        <p className="auth-subtitle">Paste your reset token and choose a strong password.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="token">Reset Token</label>
          <input id="token" type="text" name="token" value={form.token} onChange={handleChange} required />

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          {error ? <p className="error-text">{error}</p> : null}
          {message ? <p className="status-text">{message}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-links-row">
          <Link href="/login">Back to login</Link>
        </div>
      </section>
    </main>
  );
}
