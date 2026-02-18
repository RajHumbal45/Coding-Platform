import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";

export default function RegisterPage() {
  const { register, isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isReady, isAuthenticated, router]);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form.name, form.email, form.password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Create Account</p>
        <h1>Start Learning</h1>
        <p className="auth-subtitle">Create your student account and track every solved problem.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error ? <p className="error-text">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="auth-links-row">
          <Link href="/login">Already have an account?</Link>
        </div>
      </section>
    </main>
  );
}
