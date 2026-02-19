import { call, put } from "redux-saga/effects";
import {
  GetDaSheetProgressUpdateActionPayload,
  getDaSheetDashboardAction,
  getDaSheetProgressUpdateAction,
  setDaSheetDashboardAction,
  setDaSheetProgressUpdateAction,
} from "../../../actions/assessment/assessmentAction";
import {
  setGlobalLoaderAction,
  setGlobalToasterAction,
} from "../../../actions/ui/uiAction";
import {
  DaSheetDashboardResponse,
  UpdateDaSheetProgressResponse,
  getDaSheetDashboardRequest,
  updateDaSheetProgressRequest,
} from "../../requests/assessmentRequest";

export function* getDaSheetDashboardHandler(
  _action: ReturnType<typeof getDaSheetDashboardAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: DaSheetDashboardResponse = yield call(
      getDaSheetDashboardRequest
    );

    yield put(
      setDaSheetDashboardAction({
        sheetData: response.sheetData,
        completedProblemIds: response.completedProblemIds,
        fetchedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("getDaSheetDashboardHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to load assessment dashboard.",
      })
    );
  } finally {
    yield put(setGlobalLoaderAction(false));
  }
}

export function* getDaSheetProgressUpdateHandler(
  action: ReturnType<typeof getDaSheetProgressUpdateAction>
) {
  try {
    const payload: GetDaSheetProgressUpdateActionPayload = action.payload;

    const response: UpdateDaSheetProgressResponse = yield call(
      updateDaSheetProgressRequest,
      payload
    );

    yield put(
      setDaSheetProgressUpdateAction({
        completedProblemIds: response.completedProblemIds,
        lastUpdatedProblemId: payload.problemId,
      })
    );
  } catch (error) {
    console.error("getDaSheetProgressUpdateHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to update progress right now.",
      })
    );
  }
}

