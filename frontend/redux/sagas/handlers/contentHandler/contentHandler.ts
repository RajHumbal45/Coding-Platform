import { call, put } from "redux-saga/effects";
import {
  getContentAddChapterAction,
  getContentAddProblemAction,
  getContentAddTopicAction,
  getContentSheetAction,
  setContentAddChapterAction,
  setContentAddProblemAction,
  setContentAddTopicAction,
  setContentSheetAction,
} from "../../../actions/content/contentAction";
import {
  setGlobalLoaderAction,
  setGlobalToasterAction,
} from "../../../actions/ui/uiAction";
import {
  addContentChapterRequest,
  addContentProblemRequest,
  addContentTopicRequest,
  ContentMutationResponse,
  ContentSheetResponse,
  getContentSheetRequest,
} from "../../requests/contentRequest";

export function* getContentSheetHandler(
  _action: ReturnType<typeof getContentSheetAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: ContentSheetResponse = yield call(
      getContentSheetRequest
    );

    yield put(
      setContentSheetAction({
        adminSheetData: response.data || [],
        fetchedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("getContentSheetHandler error", error);
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

export function* getContentAddChapterHandler(
  action: ReturnType<typeof getContentAddChapterAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: ContentMutationResponse = yield call(
      addContentChapterRequest,
      action.payload
    );

    yield put(
      setContentAddChapterAction({
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
    console.error("getContentAddChapterHandler error", error);
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

export function* getContentAddTopicHandler(
  action: ReturnType<typeof getContentAddTopicAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: ContentMutationResponse = yield call(
      addContentTopicRequest,
      action.payload
    );

    yield put(
      setContentAddTopicAction({
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
    console.error("getContentAddTopicHandler error", error);
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

export function* getContentAddProblemHandler(
  action: ReturnType<typeof getContentAddProblemAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: ContentMutationResponse = yield call(
      addContentProblemRequest,
      action.payload
    );

    yield put(
      setContentAddProblemAction({
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
    console.error("getContentAddProblemHandler error", error);
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
