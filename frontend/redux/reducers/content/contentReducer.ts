import {
  ContentSetActionTypes,
  SetContentAddChapterActionPayload,
  SetContentAddProblemActionPayload,
  SetContentAddTopicActionPayload,
  SetContentSheetActionPayload,
  SET_CONTENT_ADD_CHAPTER,
  SET_CONTENT_ADD_PROBLEM,
  SET_CONTENT_ADD_TOPIC,
  SET_CONTENT_SHEET,
} from "../../actions/content/contentAction";
import { ContentReducerInterface } from "./contentReducerInterface";

const initialState: ContentReducerInterface = {
  adminSheetData: [],
  lastMutationType: null,
  lastMutationMessage: null,
  fetchedAt: null,
};

export const contentReducer = (
  state: ContentReducerInterface = initialState,
  action: ContentSetActionTypes
): ContentReducerInterface => {
  switch (action.type) {
    case SET_CONTENT_SHEET: {
      const payload = action.payload as SetContentSheetActionPayload;
      return {
        ...state,
        adminSheetData: payload.adminSheetData,
        fetchedAt: payload.fetchedAt,
      };
    }

    case SET_CONTENT_ADD_CHAPTER: {
      const payload = action.payload as SetContentAddChapterActionPayload;
      return {
        ...state,
        adminSheetData: payload.adminSheetData,
        lastMutationType: "chapter",
        lastMutationMessage: payload.message,
      };
    }

    case SET_CONTENT_ADD_TOPIC: {
      const payload = action.payload as SetContentAddTopicActionPayload;
      return {
        ...state,
        adminSheetData: payload.adminSheetData,
        lastMutationType: "topic",
        lastMutationMessage: payload.message,
      };
    }

    case SET_CONTENT_ADD_PROBLEM: {
      const payload = action.payload as SetContentAddProblemActionPayload;
      return {
        ...state,
        adminSheetData: payload.adminSheetData,
        lastMutationType: "problem",
        lastMutationMessage: payload.message,
      };
    }

    default:
      return state;
  }
};
