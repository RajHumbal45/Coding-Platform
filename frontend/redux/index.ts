import { combineReducers } from "redux";
import { assessmentReducer } from "./reducers/assessment/assessmentReducer";
import { contentReducer } from "./reducers/content/contentReducer";
import { uiReducer } from "./reducers/ui/uiReducer";

export const rootReducer = combineReducers({
  assessmentReducer,
  contentReducer,
  uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
