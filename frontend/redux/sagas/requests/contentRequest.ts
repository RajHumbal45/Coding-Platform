import {
  GetAdminContentAddChapterActionPayload,
  GetAdminContentAddProblemActionPayload,
  GetAdminContentAddTopicActionPayload,
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

export type AdminContentSheetResponse = AdminSheetResponse;
export type AdminContentMutationResponse = AdminMutationResponse;

export const getAdminContentSheetRequest = (): Promise<AdminContentSheetResponse> =>
  StoreGet<AdminSheetResponse>("/admin/sheet");

export const addAdminContentChapterRequest = (
  payload: GetAdminContentAddChapterActionPayload
): Promise<AdminContentMutationResponse> =>
  StorePost<AdminMutationResponse>("/admin/chapter", payload);

export const addAdminContentTopicRequest = (payload: GetAdminContentAddTopicActionPayload) =>
  StorePost<AdminMutationResponse>(`/admin/chapter/${payload.chapterId}/topic`, {
    title: payload.title,
  }) as Promise<AdminContentMutationResponse>;

export const addAdminContentProblemRequest = (
  payload: GetAdminContentAddProblemActionPayload
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
  ) as Promise<AdminContentMutationResponse>;


