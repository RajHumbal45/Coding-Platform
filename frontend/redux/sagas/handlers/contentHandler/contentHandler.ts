import { call, put } from "redux-saga/effects";
import {
  getAdminContentAddChapterAction,
  getAdminContentAddProblemAction,
  getAdminContentAddTopicAction,
  getAdminContentSheetAction,
  setAdminContentAddChapterAction,
  setAdminContentAddProblemAction,
  setAdminContentAddTopicAction,
  setAdminContentSheetAction,
} from "../../../actions/content/contentAction";
import {
  setGlobalLoaderAction,
  setGlobalToasterAction,
} from "../../../actions/ui/uiAction";
import {
  addAdminContentChapterRequest,
  addAdminContentProblemRequest,
  addAdminContentTopicRequest,
  AdminContentMutationResponse,
  AdminContentSheetResponse,
  getAdminContentSheetRequest,
} from "../../requests/contentRequest";

export function* getAdminContentSheetHandler(
  _action: ReturnType<typeof getAdminContentSheetAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: AdminContentSheetResponse = yield call(
      getAdminContentSheetRequest
    );

    yield put(
      setAdminContentSheetAction({
        adminSheetData: response.data || [],
        fetchedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("getAdminContentSheetHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to load admin content.",
      })
    );
  } finally {
    yield put(setGlobalLoaderAction(false));
  }
}

export function* getAdminContentAddChapterHandler(
  action: ReturnType<typeof getAdminContentAddChapterAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: AdminContentMutationResponse = yield call(
      addAdminContentChapterRequest,
      action.payload
    );

    yield put(
      setAdminContentAddChapterAction({
        adminSheetData: response.data || [],
        message: response.message || "Chapter created",
      })
    );
    yield put(
      setGlobalToasterAction({
        type: "success",
        message: response.message || "Chapter created",
      })
    );
  } catch (error) {
    console.error("getAdminContentAddChapterHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to create chapter.",
      })
    );
  } finally {
    yield put(setGlobalLoaderAction(false));
  }
}

export function* getAdminContentAddTopicHandler(
  action: ReturnType<typeof getAdminContentAddTopicAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: AdminContentMutationResponse = yield call(
      addAdminContentTopicRequest,
      action.payload
    );

    yield put(
      setAdminContentAddTopicAction({
        adminSheetData: response.data || [],
        message: response.message || "Topic created",
      })
    );
    yield put(
      setGlobalToasterAction({
        type: "success",
        message: response.message || "Topic created",
      })
    );
  } catch (error) {
    console.error("getAdminContentAddTopicHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to create topic.",
      })
    );
  } finally {
    yield put(setGlobalLoaderAction(false));
  }
}

export function* getAdminContentAddProblemHandler(
  action: ReturnType<typeof getAdminContentAddProblemAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: AdminContentMutationResponse = yield call(
      addAdminContentProblemRequest,
      action.payload
    );

    yield put(
      setAdminContentAddProblemAction({
        adminSheetData: response.data || [],
        message: response.message || "Problem created",
      })
    );
    yield put(
      setGlobalToasterAction({
        type: "success",
        message: response.message || "Problem created",
      })
    );
  } catch (error) {
    console.error("getAdminContentAddProblemHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to create problem.",
      })
    );
  } finally {
    yield put(setGlobalLoaderAction(false));
  }
}


