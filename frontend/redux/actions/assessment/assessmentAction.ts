import { AssessmentChapter } from "../../reducers/assessment/assessmentReducerInterface";

export const GET_DA_SHEET_DASHBOARD = "GET_DA_SHEET_DASHBOARD";
export const SET_DA_SHEET_DASHBOARD = "SET_DA_SHEET_DASHBOARD";
export const GET_DA_SHEET_PROGRESS_UPDATE = "GET_DA_SHEET_PROGRESS_UPDATE";
export const SET_DA_SHEET_PROGRESS_UPDATE = "SET_DA_SHEET_PROGRESS_UPDATE";

export interface GetDaSheetDashboardActionPayload {
  forceRefresh?: boolean;
}

export interface SetDaSheetDashboardActionPayload {
  sheetData: AssessmentChapter[];
  completedProblemIds: string[];
  fetchedAt: string;
}

export interface GetDaSheetProgressUpdateActionPayload {
  problemId: string;
  completed: boolean;
}

export interface SetDaSheetProgressUpdateActionPayload {
  completedProblemIds: string[];
  lastUpdatedProblemId: string;
}

export const getDaSheetDashboardAction = (
  payload: GetDaSheetDashboardActionPayload = {}
) => ({
  type: GET_DA_SHEET_DASHBOARD,
  payload,
});

export const setDaSheetDashboardAction = (
  payload: SetDaSheetDashboardActionPayload
) => ({
  type: SET_DA_SHEET_DASHBOARD,
  payload,
});

export const getDaSheetProgressUpdateAction = (
  payload: GetDaSheetProgressUpdateActionPayload
) => ({
  type: GET_DA_SHEET_PROGRESS_UPDATE,
  payload,
});

export const setDaSheetProgressUpdateAction = (
  payload: SetDaSheetProgressUpdateActionPayload
) => ({
  type: SET_DA_SHEET_PROGRESS_UPDATE,
  payload,
});

export type AssessmentActionTypes =
  | ReturnType<typeof setDaSheetDashboardAction>
  | ReturnType<typeof setDaSheetProgressUpdateAction>
  | ReturnType<typeof getDaSheetDashboardAction>
  | ReturnType<typeof getDaSheetProgressUpdateAction>;

export type AssessmentSetActionTypes =
  | ReturnType<typeof setDaSheetDashboardAction>
  | ReturnType<typeof setDaSheetProgressUpdateAction>;

