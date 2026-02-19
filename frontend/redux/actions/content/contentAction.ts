import { AssessmentChapter } from "../../reducers/assessment/assessmentReducerInterface";

export const GET_ADMIN_CONTENT_SHEET = "GET_ADMIN_CONTENT_SHEET";
export const SET_ADMIN_CONTENT_SHEET = "SET_ADMIN_CONTENT_SHEET";

export const GET_ADMIN_CONTENT_ADD_CHAPTER = "GET_ADMIN_CONTENT_ADD_CHAPTER";
export const SET_ADMIN_CONTENT_ADD_CHAPTER = "SET_ADMIN_CONTENT_ADD_CHAPTER";

export const GET_ADMIN_CONTENT_ADD_TOPIC = "GET_ADMIN_CONTENT_ADD_TOPIC";
export const SET_ADMIN_CONTENT_ADD_TOPIC = "SET_ADMIN_CONTENT_ADD_TOPIC";

export const GET_ADMIN_CONTENT_ADD_PROBLEM = "GET_ADMIN_CONTENT_ADD_PROBLEM";
export const SET_ADMIN_CONTENT_ADD_PROBLEM = "SET_ADMIN_CONTENT_ADD_PROBLEM";

export interface GetAdminContentSheetActionPayload {
  forceRefresh?: boolean;
}

export interface SetAdminContentSheetActionPayload {
  adminSheetData: AssessmentChapter[];
  fetchedAt: string;
}

export interface GetAdminContentAddChapterActionPayload {
  chapter: string;
}

export interface SetAdminContentAddChapterActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export interface GetAdminContentAddTopicActionPayload {
  chapterId: string;
  title: string;
}

export interface SetAdminContentAddTopicActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export interface GetAdminContentAddProblemActionPayload {
  chapterId: string;
  topicId: string;
  title: string;
  level: "Easy" | "Medium" | "Tough";
  youtube: string;
  practice: string;
  article: string;
}

export interface SetAdminContentAddProblemActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export const getAdminContentSheetAction = (payload: GetAdminContentSheetActionPayload = {}) => ({
  type: GET_ADMIN_CONTENT_SHEET,
  payload,
});

export const setAdminContentSheetAction = (payload: SetAdminContentSheetActionPayload) => ({
  type: SET_ADMIN_CONTENT_SHEET,
  payload,
});

export const getAdminContentAddChapterAction = (payload: GetAdminContentAddChapterActionPayload) => ({
  type: GET_ADMIN_CONTENT_ADD_CHAPTER,
  payload,
});

export const setAdminContentAddChapterAction = (payload: SetAdminContentAddChapterActionPayload) => ({
  type: SET_ADMIN_CONTENT_ADD_CHAPTER,
  payload,
});

export const getAdminContentAddTopicAction = (payload: GetAdminContentAddTopicActionPayload) => ({
  type: GET_ADMIN_CONTENT_ADD_TOPIC,
  payload,
});

export const setAdminContentAddTopicAction = (payload: SetAdminContentAddTopicActionPayload) => ({
  type: SET_ADMIN_CONTENT_ADD_TOPIC,
  payload,
});

export const getAdminContentAddProblemAction = (payload: GetAdminContentAddProblemActionPayload) => ({
  type: GET_ADMIN_CONTENT_ADD_PROBLEM,
  payload,
});

export const setAdminContentAddProblemAction = (payload: SetAdminContentAddProblemActionPayload) => ({
  type: SET_ADMIN_CONTENT_ADD_PROBLEM,
  payload,
});

export type ContentActionTypes =
  | ReturnType<typeof getAdminContentSheetAction>
  | ReturnType<typeof setAdminContentSheetAction>
  | ReturnType<typeof getAdminContentAddChapterAction>
  | ReturnType<typeof setAdminContentAddChapterAction>
  | ReturnType<typeof getAdminContentAddTopicAction>
  | ReturnType<typeof setAdminContentAddTopicAction>
  | ReturnType<typeof getAdminContentAddProblemAction>
  | ReturnType<typeof setAdminContentAddProblemAction>;

export type ContentSetActionTypes =
  | ReturnType<typeof setAdminContentSheetAction>
  | ReturnType<typeof setAdminContentAddChapterAction>
  | ReturnType<typeof setAdminContentAddTopicAction>
  | ReturnType<typeof setAdminContentAddProblemAction>;

