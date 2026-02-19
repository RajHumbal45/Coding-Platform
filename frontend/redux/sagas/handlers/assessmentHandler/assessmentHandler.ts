import { call, put } from "redux-saga/effects";
import {
  GetAssessmentProgressUpdateActionPayload,
  getAssessmentDashboardAction,
  getAssessmentProgressUpdateAction,
  setAssessmentDashboardAction,
  setAssessmentProgressUpdateAction,
} from "../../../actions/assessment/assessmentAction";
import {
  setGlobalLoaderAction,
  setGlobalToasterAction,
} from "../../../actions/ui/uiAction";
import {
  AssessmentDashboardResponse,
  UpdateAssessmentProgressResponse,
  getAssessmentDashboardRequest,
  updateAssessmentProgressRequest,
} from "../../requests/assessmentRequest";

export function* getAssessmentDashboardHandler(
  _action: ReturnType<typeof getAssessmentDashboardAction>
) {
  try {
    yield put(setGlobalLoaderAction(true));

    const response: AssessmentDashboardResponse = yield call(
      getAssessmentDashboardRequest
    );

    yield put(
      setAssessmentDashboardAction({
        sheetData: response.sheetData,
        completedProblemIds: response.completedProblemIds,
        fetchedAt: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("getAssessmentDashboardHandler error", error);
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

export function* getAssessmentProgressUpdateHandler(
  action: ReturnType<typeof getAssessmentProgressUpdateAction>
) {
  try {
    const payload: GetAssessmentProgressUpdateActionPayload = action.payload;

    const response: UpdateAssessmentProgressResponse = yield call(
      updateAssessmentProgressRequest,
      payload
    );

    yield put(
      setAssessmentProgressUpdateAction({
        completedProblemIds: response.completedProblemIds,
        lastUpdatedProblemId: payload.problemId,
      })
    );
  } catch (error) {
    console.error("getAssessmentProgressUpdateHandler error", error);
    yield put(
      setGlobalToasterAction({
        type: "error",
        message: "Unable to update progress right now.",
      })
    );
  }
}
