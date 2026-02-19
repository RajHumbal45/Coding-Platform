import { all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_DA_SHEET_DASHBOARD,
  GET_DA_SHEET_PROGRESS_UPDATE,
} from "../actions/assessment/assessmentAction";
import {
  GET_ADMIN_CONTENT_ADD_CHAPTER,
  GET_ADMIN_CONTENT_ADD_PROBLEM,
  GET_ADMIN_CONTENT_ADD_TOPIC,
  GET_ADMIN_CONTENT_SHEET,
} from "../actions/content/contentAction";
import {
  getDaSheetDashboardHandler,
  getDaSheetProgressUpdateHandler,
} from "./handlers/assessmentHandler/assessmentHandler";
import {
  getAdminContentAddChapterHandler,
  getAdminContentAddProblemHandler,
  getAdminContentAddTopicHandler,
  getAdminContentSheetHandler,
} from "./handlers/contentHandler/contentHandler";

export function* watcherSaga() {
  yield all([
    takeLatest(GET_DA_SHEET_DASHBOARD, getDaSheetDashboardHandler),
    takeEvery(GET_DA_SHEET_PROGRESS_UPDATE, getDaSheetProgressUpdateHandler),
    takeLatest(GET_ADMIN_CONTENT_SHEET, getAdminContentSheetHandler),
    takeLatest(GET_ADMIN_CONTENT_ADD_CHAPTER, getAdminContentAddChapterHandler),
    takeLatest(GET_ADMIN_CONTENT_ADD_TOPIC, getAdminContentAddTopicHandler),
    takeLatest(GET_ADMIN_CONTENT_ADD_PROBLEM, getAdminContentAddProblemHandler),
  ]);
}

