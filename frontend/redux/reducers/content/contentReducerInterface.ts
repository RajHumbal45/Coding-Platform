import { AssessmentChapter } from "../assessment/assessmentReducerInterface";

export interface ContentReducerInterface {
  adminSheetData: AssessmentChapter[];
  lastMutationType: "chapter" | "topic" | "problem" | null;
  lastMutationMessage: string | null;
  fetchedAt: string | null;
}
