import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAssessmentDashboardAction } from "../redux/actions/assessment/assessmentAction";
import { setGlobalToasterAction } from "../redux/actions/ui/uiAction";

export default function ProgressPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isReady } = useAuth();

  const { sheetData, completedProblemIds } = useAppSelector(
    (state) => state.assessmentReducer
  );
  const { isGlobalLoader, toaster } = useAppSelector((state) => state.uiReducer);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    dispatch(getAssessmentDashboardAction({}));
  }, [router, isAuthenticated, isReady, dispatch]);

  const summary = useMemo(() => {
    const levelMap = { Easy: 0, Medium: 0, Tough: 0 };
    const chapterRows = [];
    const solvedProblems = [];

    let total = 0;
    let solved = 0;

    for (const chapter of sheetData) {
      let chapterTotal = 0;
      let chapterSolved = 0;

      for (const topic of chapter.topics) {
        for (const problem of topic.problems) {
          total += 1;
          chapterTotal += 1;

          if (completedProblemIds.includes(problem.id)) {
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
  }, [sheetData, completedProblemIds]);

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

        {isGlobalLoader ? <p className="status-text">Loading progress...</p> : null}
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

        {!isGlobalLoader ? (
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
