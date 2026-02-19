import {
  GetContentAddChapterActionPayload,
  GetContentAddProblemActionPayload,
  GetContentAddTopicActionPayload,
} from "../../actions/content/contentAction";
import { AssessmentChapter } from "../../reducers/assessment/assessmentReducerInterface";
import { StoreGet, StorePost } from "./apiRequest";

interface AdminSheetResponse {
  data: AssessmentChapter[];
}

interface AdminMutationResponse {
  message: string;
  data: AssessmentChapter[];
}

export type ContentSheetResponse = AdminSheetResponse;
export type ContentMutationResponse = AdminMutationResponse;

export const getContentSheetRequest = (): Promise<ContentSheetResponse> =>
  StoreGet<AdminSheetResponse>("/admin/sheet");

export const addContentChapterRequest = (
  payload: GetContentAddChapterActionPayload
): Promise<ContentMutationResponse> =>
  StorePost<AdminMutationResponse>("/admin/chapter", payload);

export const addContentTopicRequest = (payload: GetContentAddTopicActionPayload) =>
  StorePost<AdminMutationResponse>(`/admin/chapter/${payload.chapterId}/topic`, {
    title: payload.title,
  }) as Promise<ContentMutationResponse>;

export const addContentProblemRequest = (
  payload: GetContentAddProblemActionPayload
) =>
  StorePost<AdminMutationResponse>(
    `/admin/chapter/${payload.chapterId}/topic/${payload.topicId}/problem`,
    {
      title: payload.title,
      level: payload.level,
      youtube: payload.youtube,
      practice: payload.practice,
      article: payload.article,
    }
  ) as Promise<ContentMutationResponse>;
