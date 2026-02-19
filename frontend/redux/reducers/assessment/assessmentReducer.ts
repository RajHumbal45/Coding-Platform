import {
  AssessmentSetActionTypes,
  SetAssessmentDashboardActionPayload,
  SetAssessmentProgressUpdateActionPayload,
  SET_ASSESSMENT_DASHBOARD,
  SET_ASSESSMENT_PROGRESS_UPDATE,
} from "../../actions/assessment/assessmentAction";
import { AssessmentReducerInterface } from "./assessmentReducerInterface";

const initialState: AssessmentReducerInterface = {
  sheetData: [],
  completedProblemIds: [],
  lastUpdatedProblemId: null,
  fetchedAt: null,
};

export const assessmentReducer = (
  state: AssessmentReducerInterface = initialState,
  action: AssessmentSetActionTypes
): AssessmentReducerInterface => {
  switch (action.type) {
    case SET_ASSESSMENT_DASHBOARD: {
      const payload = action.payload as SetAssessmentDashboardActionPayload;
      return {
        ...state,
        sheetData: payload.sheetData,
        completedProblemIds: payload.completedProblemIds,
        fetchedAt: payload.fetchedAt,
      };
    }

    case SET_ASSESSMENT_PROGRESS_UPDATE: {
      const payload = action.payload as SetAssessmentProgressUpdateActionPayload;
      return {
        ...state,
        completedProblemIds: payload.completedProblemIds,
        lastUpdatedProblemId: payload.lastUpdatedProblemId,
      };
    }

    default:
      return state;
  }
};
