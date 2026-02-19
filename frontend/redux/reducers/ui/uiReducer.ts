import {
  SET_GLOBAL_LOADER,
  SET_GLOBAL_TOASTER,
  UiActionTypes,
} from "../../actions/ui/uiAction";
import { UiReducerInterface } from "./uiReducerInterface";

const initialState: UiReducerInterface = {
  isGlobalLoader: false,
  toaster: null,
};

export const uiReducer = (
  state: UiReducerInterface = initialState,
  action: UiActionTypes
): UiReducerInterface => {
  switch (action.type) {
    case SET_GLOBAL_LOADER:
      return {
        ...state,
        isGlobalLoader: action.payload as boolean,
      };

    case SET_GLOBAL_TOASTER:
      return {
        ...state,
        toaster: action.payload as UiReducerInterface["toaster"],
      };

    default:
      return state;
  }
};
