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

export interface DaSheetDashboardResponse {
  sheetData: AssessmentChapter[];
  completedProblemIds: string[];
}

export interface UpdateDaSheetProgressRequestPayload {
  problemId: string;
  completed: boolean;
}

export interface UpdateDaSheetProgressResponse {
  completedProblemIds: string[];
}

export const getDaSheetDashboardRequest = async (): Promise<DaSheetDashboardResponse> => {
  const [sheetResponse, progressResponse] = await Promise.all([
    StoreGet<SheetResponse>("/sheet"),
    StoreGet<ProgressResponse>("/progress"),
  ]);

  return {
    sheetData: sheetResponse.data || [],
    completedProblemIds: progressResponse.completedProblemIds || [],
  };
};

export const updateDaSheetProgressRequest = async (
  payload: UpdateDaSheetProgressRequestPayload
): Promise<UpdateDaSheetProgressResponse> => {
  return StorePut<UpdateDaSheetProgressResponse>(
    `/progress/${payload.problemId}`,
    { completed: payload.completed }
  );
};

