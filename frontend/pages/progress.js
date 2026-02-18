import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { getProgress, getSheet } from "../src/api/client";

export default function ProgressPage() {
  const router = useRouter();
  const { isAuthenticated, user, isReady } = useAuth();

  const [sheet, setSheet] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [sheetResponse, progressResponse] = await Promise.all([getSheet(), getProgress()]);
        setSheet(sheetResponse.data || []);
        setCompletedIds(progressResponse.completedProblemIds || []);
      } catch (err) {
        setError(err.message || "Failed to load progress");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, isAuthenticated, isReady]);

  const summary = useMemo(() => {
    const levelMap = { Easy: 0, Medium: 0, Tough: 0 };
    const chapterRows = [];
    const solvedProblems = [];

    let total = 0;
    let solved = 0;

    for (const chapter of sheet) {
      let chapterTotal = 0;
      let chapterSolved = 0;

      for (const topic of chapter.topics) {
        for (const problem of topic.problems) {
          total += 1;
          chapterTotal += 1;

          if (completedIds.includes(problem.id)) {
            solved += 1;
            chapterSolved += 1;
            levelMap[problem.level] = (levelMap[problem.level] || 0) + 1;
            solvedProblems.push({
              chapter: chapter.chapter,
              topic: topic.title,
              title: problem.title,
              level: problem.level,
            });
          }
        }
      }

      chapterRows.push({
        chapter: chapter.chapter,
        solved: chapterSolved,
        total: chapterTotal,
        percent: chapterTotal ? Math.round((chapterSolved / chapterTotal) * 100) : 0,
      });
    }

    return {
      total,
      solved,
      percent: total ? Math.round((solved / total) * 100) : 0,
      levels: levelMap,
      chapterRows,
      solvedProblems,
    };
  }, [sheet, completedIds]);

  if (!isReady || !isAuthenticated) {
    return null;
  }

  return (
    <main className="dashboard-shell">
      <div className="page-container">
        <header className="dashboard-header upgraded-header">
          <div>
            <p className="eyebrow">Progress Tracker</p>
            <h1>{user?.name || "Student"} Progress</h1>
            <p className="header-subtitle">
              {summary.solved}/{summary.total} solved ({summary.percent}%)
            </p>
          </div>

          <div className="header-actions">
            <Link href="/dashboard" className="ghost-btn">
              Back To Sheet
            </Link>
          </div>
        </header>

        {loading ? <p className="status-text">Loading progress...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {!loading && !error ? (
          <>
            <section className="progress-banner">
              <div className="progress-meta">
                <strong>Overall Completion: {summary.percent}%</strong>
                <span>{summary.total - summary.solved} problems pending</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${summary.percent}%` }} />
              </div>
            </section>

            <section className="stats-grid">
              <article className="stat-card easy-card">
                <h3>Easy Solved</h3>
                <p>{summary.levels.Easy}</p>
              </article>
              <article className="stat-card medium-card">
                <h3>Medium Solved</h3>
                <p>{summary.levels.Medium}</p>
              </article>
              <article className="stat-card tough-card">
                <h3>Tough Solved</h3>
                <p>{summary.levels.Tough}</p>
              </article>
            </section>

            <section className="chapter-card">
              <h2>Chapter Wise Progress</h2>
              <div className="chapter-table">
                {summary.chapterRows.map((row) => (
                  <div key={row.chapter} className="table-row">
                    <div>
                      <strong>{row.chapter}</strong>
                      <p>
                        {row.solved}/{row.total} solved
                      </p>
                    </div>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill" style={{ width: `${row.percent}%` }} />
                    </div>
                    <span>{row.percent}%</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="chapter-card">
              <h2>Completed Problems</h2>
              {summary.solvedProblems.length ? (
                <ul className="completed-list">
                  {summary.solvedProblems.map((item) => (
                    <li key={`${item.chapter}-${item.topic}-${item.title}`}>
                      <strong>{item.title}</strong>
                      <span>
                        {item.chapter} {" > "} {item.topic} {" > "} {item.level}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="status-text">No completed problems yet.</p>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
