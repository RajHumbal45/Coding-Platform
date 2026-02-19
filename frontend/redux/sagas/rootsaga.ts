import { all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_ASSESSMENT_DASHBOARD,
  GET_ASSESSMENT_PROGRESS_UPDATE,
} from "../actions/assessment/assessmentAction";
import {
  GET_CONTENT_ADD_CHAPTER,
  GET_CONTENT_ADD_PROBLEM,
  GET_CONTENT_ADD_TOPIC,
  GET_CONTENT_SHEET,
} from "../actions/content/contentAction";
import {
  getAssessmentDashboardHandler,
  getAssessmentProgressUpdateHandler,
} from "./handlers/assessmentHandler/assessmentHandler";
import {
  getContentAddChapterHandler,
  getContentAddProblemHandler,
  getContentAddTopicHandler,
  getContentSheetHandler,
} from "./handlers/contentHandler/contentHandler";

export function* watcherSaga() {
  yield all([
    takeLatest(GET_ASSESSMENT_DASHBOARD, getAssessmentDashboardHandler),
    takeEvery(GET_ASSESSMENT_PROGRESS_UPDATE, getAssessmentProgressUpdateHandler),
    takeLatest(GET_CONTENT_SHEET, getContentSheetHandler),
    takeLatest(GET_CONTENT_ADD_CHAPTER, getContentAddChapterHandler),
    takeLatest(GET_CONTENT_ADD_TOPIC, getContentAddTopicHandler),
    takeLatest(GET_CONTENT_ADD_PROBLEM, getContentAddProblemHandler),
  ]);
}
