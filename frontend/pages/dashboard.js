import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getAssessmentDashboardAction,
  getAssessmentProgressUpdateAction,
} from "../redux/actions/assessment/assessmentAction";
import { setGlobalToasterAction } from "../redux/actions/ui/uiAction";
import ChapterCard from "../src/components/ChapterCard";

const levelOrder = ["Easy", "Medium", "Tough"];

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, logout, isReady, isAdmin } = useAuth();

  const { sheetData, completedProblemIds } = useAppSelector(
    (state) => state.assessmentReducer
  );
  const { isGlobalLoader, toaster } = useAppSelector((state) => state.uiReducer);

  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

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

  const filteredSheet = useMemo(() => {
    const q = query.trim().toLowerCase();

    return sheetData
      .map((chapter) => {
        const topics = chapter.topics
          .map((topic) => {
            const problems = topic.problems.filter((problem) => {
              const queryMatch =
                !q ||
                problem.title.toLowerCase().includes(q) ||
                topic.title.toLowerCase().includes(q) ||
                chapter.chapter.toLowerCase().includes(q);

              const levelMatch = levelFilter === "All" || problem.level === levelFilter;

              return queryMatch && levelMatch;
            });

            return { ...topic, problems };
          })
          .filter((topic) => topic.problems.length > 0);

        return { ...chapter, topics };
      })
      .filter((chapter) => chapter.topics.length > 0);
  }, [sheetData, query, levelFilter]);

  const totalProblems = useMemo(() => {
    return sheetData.reduce((total, chapter) => {
      return total + chapter.topics.reduce((topicCount, topic) => topicCount + topic.problems.length, 0);
    }, 0);
  }, [sheetData]);

  const completionPercent = totalProblems
    ? Math.round((completedProblemIds.length / totalProblems) * 100)
    : 0;
  const totalChapters = sheetData.length;
  const activeFilterCount = (query.trim() ? 1 : 0) + (levelFilter !== "All" ? 1 : 0);

  const handleToggle = async (problemId, checked) => {
    dispatch(
      getAssessmentProgressUpdateAction({
        problemId,
        completed: checked,
      })
    );
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (!isReady || !isAuthenticated) {
    return null;
  }

  return (
    <main className="dashboard-shell">
      <div className="page-container">
        <header className="dashboard-header upgraded-header">
          <div>
            <p className="eyebrow">Learning Dashboard</p>
            <h1>DA Sheet</h1>
            <p className="header-subtitle">
              {user?.name || "Student"} | {completedProblemIds.length}/{totalProblems} solved ({completionPercent}%)
            </p>
          </div>

          <div className="header-actions">
            <Link href="/progress" className="ghost-btn">
              View Progress
            </Link>
            {isAdmin ? (
              <Link href="/admin" className="ghost-btn">
                Admin Panel
              </Link>
            ) : null}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="info-strip">
          <strong>How to use:</strong>
          <span>
            Expand chapter, open topic, solve problems, mark checkbox. Your progress saves automatically.
          </span>
        </section>

        <section className="progress-banner">
          <div className="progress-meta">
            <strong>{completionPercent}% completed</strong>
            <span>{totalProblems - completedProblemIds.length} remaining problems</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${completionPercent}%` }} />
          </div>
        </section>

        <section className="quick-metrics">
          <article className="metric-card">
            <p className="metric-label">Chapters</p>
            <strong>{totalChapters}</strong>
          </article>
          <article className="metric-card">
            <p className="metric-label">Solved</p>
            <strong>{completedProblemIds.length}</strong>
          </article>
          <article className="metric-card">
            <p className="metric-label">Pending</p>
            <strong>{Math.max(totalProblems - completedProblemIds.length, 0)}</strong>
          </article>
          <article className="metric-card">
            <p className="metric-label">Active Filters</p>
            <strong>{activeFilterCount}</strong>
          </article>
        </section>

        <section className="filter-bar">
          <input
            type="text"
            placeholder="Search chapter, topic or problem"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
            <option value="All">All Levels</option>
            {levelOrder.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => {
              setQuery("");
              setLevelFilter("All");
            }}
          >
            Clear Filters
          </button>
        </section>

        {isGlobalLoader ? <p className="status-text">Loading sheet...</p> : null}
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

        {!isGlobalLoader && filteredSheet.length === 0 ? (
          <p className="status-text">No problems match current search/filter.</p>
        ) : null}

        {!isGlobalLoader
          ? filteredSheet.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                completedIds={completedProblemIds}
                onToggle={handleToggle}
              />
            ))
          : null}
      </div>
    </main>
  );
}
