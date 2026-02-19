import {
  AssessmentSetActionTypes,
  SetDaSheetDashboardActionPayload,
  SetDaSheetProgressUpdateActionPayload,
  SET_DA_SHEET_DASHBOARD,
  SET_DA_SHEET_PROGRESS_UPDATE,
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
    case SET_DA_SHEET_DASHBOARD: {
      const payload = action.payload as SetDaSheetDashboardActionPayload;
      return {
        ...state,
        sheetData: payload.sheetData,
        completedProblemIds: payload.completedProblemIds,
        fetchedAt: payload.fetchedAt,
      };
    }

    case SET_DA_SHEET_PROGRESS_UPDATE: {
      const payload = action.payload as SetDaSheetProgressUpdateActionPayload;
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

