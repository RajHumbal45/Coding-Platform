import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getContentAddChapterAction,
  getContentAddProblemAction,
  getContentAddTopicAction,
  getContentSheetAction,
} from "../redux/actions/content/contentAction";
import { setGlobalToasterAction } from "../redux/actions/ui/uiAction";

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
  const dispatch = useAppDispatch();
  const { isReady, isAuthenticated, isAdmin } = useAuth();

  const { adminSheetData, lastMutationMessage } = useAppSelector(
    (state) => state.contentReducer
  );
  const { isGlobalLoader, toaster } = useAppSelector((state) => state.uiReducer);

  const [chapterForm, setChapterForm] = useState({ chapter: "" });
  const [topicForm, setTopicForm] = useState({ chapterId: "", title: "" });
  const [problemForm, setProblemForm] = useState(initialProblem);

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

    dispatch(getContentSheetAction({}));
  }, [isReady, isAuthenticated, isAdmin, router, dispatch]);

  const submitChapter = (event) => {
    event.preventDefault();
    dispatch(getContentAddChapterAction({ chapter: chapterForm.chapter }));
    setChapterForm({ chapter: "" });
  };

  const submitTopic = (event) => {
    event.preventDefault();
    dispatch(
      getContentAddTopicAction({
        chapterId: topicForm.chapterId,
        title: topicForm.title,
      })
    );
    setTopicForm({ chapterId: "", title: "" });
  };

  const submitProblem = (event) => {
    event.preventDefault();
    dispatch(
      getContentAddProblemAction({
        chapterId: problemForm.chapterId,
        topicId: problemForm.topicId,
        title: problemForm.title,
        level: problemForm.level,
        youtube: problemForm.youtube,
        practice: problemForm.practice,
        article: problemForm.article,
      })
    );
    setProblemForm(initialProblem);
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

        {isGlobalLoader ? <p className="status-text">Loading admin data...</p> : null}
        {lastMutationMessage ? <p className="status-text">{lastMutationMessage}</p> : null}
        {toaster ? (
          <p className={toaster.type === "error" ? "error-text" : "status-text"}>
            {toaster.message}
            <button
              type="button"
              className="ghost-btn inline-clear-btn"
              onClick={() => dispatch(setGlobalToasterAction(null))}
            >
              Dismiss
            </button>
          </p>
        ) : null}

        <section className="stats-grid">
          <article className="chapter-card admin-card">
            <h2>Add Chapter</h2>
            <form className="auth-form" onSubmit={submitChapter}>
              <input
                placeholder="Chapter Title"
                value={chapterForm.chapter}
                onChange={(e) => setChapterForm((p) => ({ ...p, chapter: e.target.value }))}
                required
              />
              <button type="submit">Create Chapter</button>
            </form>
          </article>

          <article className="chapter-card admin-card">
            <h2>Add Topic</h2>
            <form className="auth-form" onSubmit={submitTopic}>
              <select
                value={topicForm.chapterId}
                onChange={(e) =>
                  setTopicForm((p) => ({ ...p, chapterId: e.target.value }))
                }
                required
              >
                <option value="">Select Chapter</option>
                {adminSheetData.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.chapter}
                  </option>
                ))}
              </select>
              <input
                placeholder="Topic Title"
                value={topicForm.title}
                onChange={(e) => setTopicForm((p) => ({ ...p, title: e.target.value }))}
                required
              />
              <button type="submit">Create Topic</button>
            </form>
          </article>

          <article className="chapter-card admin-card">
            <h2>Add Problem</h2>
            <form className="auth-form" onSubmit={submitProblem}>
              <select
                value={problemForm.chapterId}
                onChange={(e) =>
                  setProblemForm((p) => ({ ...p, chapterId: e.target.value, topicId: "" }))
                }
                required
              >
                <option value="">Select Chapter</option>
                {adminSheetData.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.chapter}
                  </option>
                ))}
              </select>
              <select
                value={problemForm.topicId}
                onChange={(e) => setProblemForm((p) => ({ ...p, topicId: e.target.value }))}
                required
              >
                <option value="">Select Topic</option>
                {(adminSheetData.find((chapter) => chapter.id === problemForm.chapterId)
                  ?.topics || []).map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <input
                placeholder="Problem Title"
                value={problemForm.title}
                onChange={(e) => setProblemForm((p) => ({ ...p, title: e.target.value }))}
                required
              />
              <select
                value={problemForm.level}
                onChange={(e) => setProblemForm((p) => ({ ...p, level: e.target.value }))}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Tough</option>
              </select>
              <input
                placeholder="YouTube URL"
                value={problemForm.youtube}
                onChange={(e) => setProblemForm((p) => ({ ...p, youtube: e.target.value }))}
                required
              />
              <input
                placeholder="LeetCode/Codeforces URL"
                value={problemForm.practice}
                onChange={(e) => setProblemForm((p) => ({ ...p, practice: e.target.value }))}
                required
              />
              <input
                placeholder="Article URL"
                value={problemForm.article}
                onChange={(e) => setProblemForm((p) => ({ ...p, article: e.target.value }))}
                required
              />
              <button type="submit">Create Problem</button>
            </form>
          </article>
        </section>

        <section className="chapter-card">
          <h2>Current Sheet Snapshot</h2>
          <div className="chapter-table">
            {adminSheetData.map((chapter) => (
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
