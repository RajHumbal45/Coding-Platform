import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { getProgress, getSheet, setProblemCompletion } from "../src/api/client";
import ChapterCard from "../src/components/ChapterCard";

const levelOrder = ["Easy", "Medium", "Tough"];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isReady, isAdmin } = useAuth();

  const [sheet, setSheet] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [sheetResponse, progressResponse] = await Promise.all([getSheet(), getProgress()]);
        setSheet(sheetResponse.data || []);
        setCompletedIds(progressResponse.completedProblemIds || []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, isAuthenticated, isReady]);

  const filteredSheet = useMemo(() => {
    const q = query.trim().toLowerCase();

    return sheet
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
  }, [sheet, query, levelFilter]);

  const totalProblems = useMemo(() => {
    return sheet.reduce((total, chapter) => {
      return total + chapter.topics.reduce((topicCount, topic) => topicCount + topic.problems.length, 0);
    }, 0);
  }, [sheet]);

  const completionPercent = totalProblems ? Math.round((completedIds.length / totalProblems) * 100) : 0;
  const totalChapters = sheet.length;
  const activeFilterCount = (query.trim() ? 1 : 0) + (levelFilter !== "All" ? 1 : 0);

  const handleToggle = async (problemId, checked) => {
    setCompletedIds((prev) => {
      if (checked) {
        return prev.includes(problemId) ? prev : [...prev, problemId];
      }

      return prev.filter((id) => id !== problemId);
    });

    try {
      const response = await setProblemCompletion(problemId, checked);
      setCompletedIds(response.completedProblemIds || []);
      setError("");
    } catch (err) {
      setError(err.message || "Could not save progress");
    }
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
              {user?.name || "Student"} | {completedIds.length}/{totalProblems} solved ({completionPercent}%)
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
            <span>{totalProblems - completedIds.length} remaining problems</span>
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
            <strong>{completedIds.length}</strong>
          </article>
          <article className="metric-card">
            <p className="metric-label">Pending</p>
            <strong>{Math.max(totalProblems - completedIds.length, 0)}</strong>
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

        {loading ? <p className="status-text">Loading sheet...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {!loading && !error && filteredSheet.length === 0 ? (
          <p className="status-text">No problems match current search/filter.</p>
        ) : null}

        {!loading && !error
          ? filteredSheet.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                completedIds={completedIds}
                onToggle={handleToggle}
              />
            ))
          : null}
      </div>
    </main>
  );
}
