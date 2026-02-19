import { AssessmentChapter } from "../../reducers/assessment/assessmentReducerInterface";

export const GET_ASSESSMENT_DASHBOARD = "GET_ASSESSMENT_DASHBOARD";
export const SET_ASSESSMENT_DASHBOARD = "SET_ASSESSMENT_DASHBOARD";
export const GET_ASSESSMENT_PROGRESS_UPDATE = "GET_ASSESSMENT_PROGRESS_UPDATE";
export const SET_ASSESSMENT_PROGRESS_UPDATE = "SET_ASSESSMENT_PROGRESS_UPDATE";

export interface GetAssessmentDashboardActionPayload {
  forceRefresh?: boolean;
}

export interface SetAssessmentDashboardActionPayload {
  sheetData: AssessmentChapter[];
  completedProblemIds: string[];
  fetchedAt: string;
}

export interface GetAssessmentProgressUpdateActionPayload {
  problemId: string;
  completed: boolean;
}

export interface SetAssessmentProgressUpdateActionPayload {
  completedProblemIds: string[];
  lastUpdatedProblemId: string;
}

export const getAssessmentDashboardAction = (
  payload: GetAssessmentDashboardActionPayload = {}
) => ({
  type: GET_ASSESSMENT_DASHBOARD,
  payload,
});

export const setAssessmentDashboardAction = (
  payload: SetAssessmentDashboardActionPayload
) => ({
  type: SET_ASSESSMENT_DASHBOARD,
  payload,
});

export const getAssessmentProgressUpdateAction = (
  payload: GetAssessmentProgressUpdateActionPayload
) => ({
  type: GET_ASSESSMENT_PROGRESS_UPDATE,
  payload,
});

export const setAssessmentProgressUpdateAction = (
  payload: SetAssessmentProgressUpdateActionPayload
) => ({
  type: SET_ASSESSMENT_PROGRESS_UPDATE,
  payload,
});

export type AssessmentActionTypes =
  | ReturnType<typeof setAssessmentDashboardAction>
  | ReturnType<typeof setAssessmentProgressUpdateAction>
  | ReturnType<typeof getAssessmentDashboardAction>
  | ReturnType<typeof getAssessmentProgressUpdateAction>;

export type AssessmentSetActionTypes =
  | ReturnType<typeof setAssessmentDashboardAction>
  | ReturnType<typeof setAssessmentProgressUpdateAction>;
