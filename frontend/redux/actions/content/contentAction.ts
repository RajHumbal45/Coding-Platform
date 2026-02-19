import { AssessmentChapter } from "../../reducers/assessment/assessmentReducerInterface";

export const GET_CONTENT_SHEET = "GET_CONTENT_SHEET";
export const SET_CONTENT_SHEET = "SET_CONTENT_SHEET";

export const GET_CONTENT_ADD_CHAPTER = "GET_CONTENT_ADD_CHAPTER";
export const SET_CONTENT_ADD_CHAPTER = "SET_CONTENT_ADD_CHAPTER";

export const GET_CONTENT_ADD_TOPIC = "GET_CONTENT_ADD_TOPIC";
export const SET_CONTENT_ADD_TOPIC = "SET_CONTENT_ADD_TOPIC";

export const GET_CONTENT_ADD_PROBLEM = "GET_CONTENT_ADD_PROBLEM";
export const SET_CONTENT_ADD_PROBLEM = "SET_CONTENT_ADD_PROBLEM";

export interface GetContentSheetActionPayload {
  forceRefresh?: boolean;
}

export interface SetContentSheetActionPayload {
  adminSheetData: AssessmentChapter[];
  fetchedAt: string;
}

export interface GetContentAddChapterActionPayload {
  chapter: string;
}

export interface SetContentAddChapterActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export interface GetContentAddTopicActionPayload {
  chapterId: string;
  title: string;
}

export interface SetContentAddTopicActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export interface GetContentAddProblemActionPayload {
  chapterId: string;
  topicId: string;
  title: string;
  level: "Easy" | "Medium" | "Tough";
  youtube: string;
  practice: string;
  article: string;
}

export interface SetContentAddProblemActionPayload {
  adminSheetData: AssessmentChapter[];
  message: string;
}

export const getContentSheetAction = (payload: GetContentSheetActionPayload = {}) => ({
  type: GET_CONTENT_SHEET,
  payload,
});

export const setContentSheetAction = (payload: SetContentSheetActionPayload) => ({
  type: SET_CONTENT_SHEET,
  payload,
});

export const getContentAddChapterAction = (payload: GetContentAddChapterActionPayload) => ({
  type: GET_CONTENT_ADD_CHAPTER,
  payload,
});

export const setContentAddChapterAction = (payload: SetContentAddChapterActionPayload) => ({
  type: SET_CONTENT_ADD_CHAPTER,
  payload,
});

export const getContentAddTopicAction = (payload: GetContentAddTopicActionPayload) => ({
  type: GET_CONTENT_ADD_TOPIC,
  payload,
});

export const setContentAddTopicAction = (payload: SetContentAddTopicActionPayload) => ({
  type: SET_CONTENT_ADD_TOPIC,
  payload,
});

export const getContentAddProblemAction = (payload: GetContentAddProblemActionPayload) => ({
  type: GET_CONTENT_ADD_PROBLEM,
  payload,
});

export const setContentAddProblemAction = (payload: SetContentAddProblemActionPayload) => ({
  type: SET_CONTENT_ADD_PROBLEM,
  payload,
});

export type ContentActionTypes =
  | ReturnType<typeof getContentSheetAction>
  | ReturnType<typeof setContentSheetAction>
  | ReturnType<typeof getContentAddChapterAction>
  | ReturnType<typeof setContentAddChapterAction>
  | ReturnType<typeof getContentAddTopicAction>
  | ReturnType<typeof setContentAddTopicAction>
  | ReturnType<typeof getContentAddProblemAction>
  | ReturnType<typeof setContentAddProblemAction>;

export type ContentSetActionTypes =
  | ReturnType<typeof setContentSheetAction>
  | ReturnType<typeof setContentAddChapterAction>
  | ReturnType<typeof setContentAddTopicAction>
  | ReturnType<typeof setContentAddProblemAction>;
