export interface AssessmentProblem {
  id: string;
  title: string;
  level: "Easy" | "Medium" | "Tough";
  youtube: string;
  practice: string;
  article: string;
}

export interface AssessmentTopic {
  id: string;
  title: string;
  problems: AssessmentProblem[];
}

export interface AssessmentChapter {
  id: string;
  chapter: string;
  topics: AssessmentTopic[];
}

export interface AssessmentReducerInterface {
  sheetData: AssessmentChapter[];
  completedProblemIds: string[];
  lastUpdatedProblemId: string | null;
  fetchedAt: string | null;
}
