import { UiToasterPayload } from "../../reducers/ui/uiReducerInterface";

export const SET_GLOBAL_LOADER = "SET_GLOBAL_LOADER";
export const SET_GLOBAL_TOASTER = "SET_GLOBAL_TOASTER";

export const setGlobalLoaderAction = (payload: boolean) => ({
  type: SET_GLOBAL_LOADER,
  payload,
});

export const setGlobalToasterAction = (payload: UiToasterPayload | null) => ({
  type: SET_GLOBAL_TOASTER,
  payload,
});

export type UiActionTypes =
  | ReturnType<typeof setGlobalLoaderAction>
  | ReturnType<typeof setGlobalToasterAction>;
