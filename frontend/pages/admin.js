import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { addChapter, addProblem, addTopic, getAdminSheet } from "../src/api/client";

const initialProblem = {
  chapterId: "",
  topicId: "",
  title: "",
  level: "Easy",
  youtube: "",
  practice: "",
  article: "",
};

export default function AdminPage() {
  const router = useRouter();
  const { isReady, isAuthenticated, isAdmin } = useAuth();

  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [chapterForm, setChapterForm] = useState({ chapter: "" });
  const [topicForm, setTopicForm] = useState({ chapterId: "", title: "" });
  const [problemForm, setProblemForm] = useState(initialProblem);

  const refresh = async () => {
    const response = await getAdminSheet();
    setSheet(response.data || []);
  };

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/dashboard");
      return;
    }

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        await refresh();
      } catch (err) {
        setError(err.message || "Failed to load admin panel");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [isReady, isAuthenticated, isAdmin, router]);

  const submitChapter = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await addChapter({ chapter: chapterForm.chapter });
      setMessage("Chapter created");
      setChapterForm({ chapter: "" });
      await refresh();
    } catch (err) {
      setError(err.message || "Failed to add chapter");
    }
  };

  const submitTopic = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await addTopic(topicForm.chapterId, { title: topicForm.title });
      setMessage("Topic created");
      setTopicForm({ chapterId: "", title: "" });
      await refresh();
    } catch (err) {
      setError(err.message || "Failed to add topic");
    }
  };

  const submitProblem = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const { chapterId, topicId, ...problemPayload } = problemForm;
      await addProblem(chapterId, topicId, problemPayload);
      setMessage("Problem created");
      setProblemForm(initialProblem);
      await refresh();
    } catch (err) {
      setError(err.message || "Failed to add problem");
    }
  };

  if (!isReady || !isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <main className="dashboard-shell">
      <div className="page-container">
        <header className="dashboard-header upgraded-header">
          <div>
            <p className="eyebrow">Admin Console</p>
            <h1>Manage DA Sheet</h1>
            <p className="header-subtitle">Create chapters, topics and problems directly from UI.</p>
          </div>
          <div className="header-actions">
            <Link href="/dashboard" className="ghost-btn">
              Back To Dashboard
            </Link>
          </div>
        </header>

        {loading ? <p className="status-text">Loading admin data...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        {message ? <p className="status-text">{message}</p> : null}

        <section className="stats-grid">
          <article className="chapter-card admin-card">
            <h2>Add Chapter</h2>
            <form className="auth-form" onSubmit={submitChapter}>
              <input placeholder="Chapter Title" value={chapterForm.chapter} onChange={(e) => setChapterForm((p) => ({ ...p, chapter: e.target.value }))} required />
              <button type="submit">Create Chapter</button>
            </form>
          </article>

          <article className="chapter-card admin-card">
            <h2>Add Topic</h2>
            <form className="auth-form" onSubmit={submitTopic}>
              <select value={topicForm.chapterId} onChange={(e) => setTopicForm((p) => ({ ...p, chapterId: e.target.value }))} required>
                <option value="">Select Chapter</option>
                {sheet.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.chapter}
                  </option>
                ))}
              </select>
              <input placeholder="Topic Title" value={topicForm.title} onChange={(e) => setTopicForm((p) => ({ ...p, title: e.target.value }))} required />
              <button type="submit">Create Topic</button>
            </form>
          </article>

          <article className="chapter-card admin-card">
            <h2>Add Problem</h2>
            <form className="auth-form" onSubmit={submitProblem}>
              <select
                value={problemForm.chapterId}
                onChange={(e) => setProblemForm((p) => ({ ...p, chapterId: e.target.value, topicId: "" }))}
                required
              >
                <option value="">Select Chapter</option>
                {sheet.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.chapter}
                  </option>
                ))}
              </select>
              <select value={problemForm.topicId} onChange={(e) => setProblemForm((p) => ({ ...p, topicId: e.target.value }))} required>
                <option value="">Select Topic</option>
                {(sheet.find((chapter) => chapter.id === problemForm.chapterId)?.topics || []).map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <input placeholder="Problem Title" value={problemForm.title} onChange={(e) => setProblemForm((p) => ({ ...p, title: e.target.value }))} required />
              <select value={problemForm.level} onChange={(e) => setProblemForm((p) => ({ ...p, level: e.target.value }))}>
                <option>Easy</option>
                <option>Medium</option>
                <option>Tough</option>
              </select>
              <input placeholder="YouTube URL" value={problemForm.youtube} onChange={(e) => setProblemForm((p) => ({ ...p, youtube: e.target.value }))} required />
              <input placeholder="LeetCode/Codeforces URL" value={problemForm.practice} onChange={(e) => setProblemForm((p) => ({ ...p, practice: e.target.value }))} required />
              <input placeholder="Article URL" value={problemForm.article} onChange={(e) => setProblemForm((p) => ({ ...p, article: e.target.value }))} required />
              <button type="submit">Create Problem</button>
            </form>
          </article>
        </section>

        <section className="chapter-card">
          <h2>Current Sheet Snapshot</h2>
          <div className="chapter-table">
            {sheet.map((chapter) => (
                <div key={chapter.id} className="table-row">
                  <div>
                    <strong>{chapter.chapter}</strong>
                    <p>{chapter.id}</p>
                  </div>
                <span>{chapter.topics.length} topics</span>
                <span>
                  {chapter.topics.reduce((acc, topic) => acc + topic.problems.length, 0)} problems
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
