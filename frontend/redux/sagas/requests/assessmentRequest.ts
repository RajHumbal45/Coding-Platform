import {
  AssessmentChapter,
} from "../../reducers/assessment/assessmentReducerInterface";
import { StoreGet, StorePut } from "./apiRequest";

interface SheetResponse {
  data: AssessmentChapter[];
}

interface ProgressResponse {
  completedProblemIds: string[];
}

export interface AssessmentDashboardResponse {
  sheetData: AssessmentChapter[];
  completedProblemIds: string[];
}

export interface UpdateAssessmentProgressRequestPayload {
  problemId: string;
  completed: boolean;
}

export interface UpdateAssessmentProgressResponse {
  completedProblemIds: string[];
}

export const getAssessmentDashboardRequest = async (): Promise<AssessmentDashboardResponse> => {
  const [sheetResponse, progressResponse] = await Promise.all([
    StoreGet<SheetResponse>("/sheet"),
    StoreGet<ProgressResponse>("/progress"),
  ]);

  return {
    sheetData: sheetResponse.data || [],
    completedProblemIds: progressResponse.completedProblemIds || [],
  };
};

export const updateAssessmentProgressRequest = async (
  payload: UpdateAssessmentProgressRequestPayload
): Promise<UpdateAssessmentProgressResponse> => {
  return StorePut<UpdateAssessmentProgressResponse>(
    `/progress/${payload.problemId}`,
    { completed: payload.completed }
  );
};
