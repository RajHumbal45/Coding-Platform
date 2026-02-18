import { useState } from "react";

const levelClass = {
  Easy: "tag-easy",
  Medium: "tag-medium",
  Tough: "tag-tough",
};

export default function ChapterCard({ chapter, completedIds, onToggle }) {
  const [isChapterOpen, setIsChapterOpen] = useState(false);
  const [openTopicIds, setOpenTopicIds] = useState({});

  const topicCount = chapter.topics.length;
  const problemCount = chapter.topics.reduce((total, topic) => total + topic.problems.length, 0);
  const chapterCompletedCount = chapter.topics.reduce(
    (total, topic) => total + topic.problems.filter((problem) => completedIds.includes(problem.id)).length,
    0
  );

  const toggleTopic = (topicId) => {
    setOpenTopicIds((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  return (
    <section className="chapter-card">
      <button
        type="button"
        className="accordion-row chapter-row"
        onClick={() => setIsChapterOpen((prev) => !prev)}
      >
        <div className="row-title-wrap">
          <span className="hierarchy-tag chapter-tag">Chapter</span>
          <h2>{chapter.chapter}</h2>
          <p>
            {topicCount} topics | {chapterCompletedCount}/{problemCount} solved
          </p>
        </div>
        <span className={`chevron ${isChapterOpen ? "open" : ""}`}>{">"}</span>
      </button>

      {isChapterOpen ? (
        <div className="topics-wrap">
          {chapter.topics.map((topic) => {
            const isTopicOpen = !!openTopicIds[topic.id];
            const solvedInTopic = topic.problems.filter((problem) =>
              completedIds.includes(problem.id)
            ).length;

            return (
              <div key={topic.id} className="topic-block">
                <button
                  type="button"
                  className="accordion-row topic-row"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="row-title-wrap">
                    <span className="hierarchy-tag topic-tag">Topic</span>
                    <h3>{topic.title}</h3>
                    <p>
                      {solvedInTopic}/{topic.problems.length} solved
                    </p>
                  </div>
                  <span className={`chevron ${isTopicOpen ? "open" : ""}`}>{">"}</span>
                </button>

                {isTopicOpen ? (
                  <ul className="problems-list">
                    <li className="problem-group-title">Subtopics / Problems</li>
                    {topic.problems.map((problem) => {
                      const completed = completedIds.includes(problem.id);

                      return (
                        <li key={problem.id} className="problem-row">
                          <label className="problem-title">
                            <input
                              type="checkbox"
                              checked={completed}
                              onChange={(event) => onToggle(problem.id, event.target.checked)}
                            />
                            <span>{problem.title}</span>
                          </label>

                          <span
                            className={`level-tag ${levelClass[problem.level] || "tag-medium"}`}
                          >
                            {problem.level}
                          </span>

                          <div className="problem-links">
                            <a href={problem.youtube} target="_blank" rel="noreferrer">
                              YouTube
                            </a>
                            <a href={problem.practice} target="_blank" rel="noreferrer">
                              LeetCode/CF
                            </a>
                            <a href={problem.article} target="_blank" rel="noreferrer">
                              Article
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
