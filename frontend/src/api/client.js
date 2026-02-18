const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const loginUser = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerUser = (payload) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logoutUser = () =>
  request("/auth/logout", {
    method: "POST",
  });

export const getCurrentUser = () => request("/auth/me");

export const forgotPassword = (payload) =>
  request("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const resetPassword = (payload) =>
  request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getSheet = () => request("/sheet");

export const getProgress = () => request("/progress");

export const setProblemCompletion = (problemId, completed) =>
  request(`/progress/${problemId}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
  });

export const getAdminSheet = () => request("/admin/sheet");

export const replaceAdminSheet = (data) =>
  request("/admin/sheet", {
    method: "PUT",
    body: JSON.stringify({ data }),
  });

export const addChapter = (payload) =>
  request("/admin/chapter", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const addTopic = (chapterId, payload) =>
  request(`/admin/chapter/${chapterId}/topic`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const addProblem = (chapterId, topicId, payload) =>
  request(`/admin/chapter/${chapterId}/topic/${topicId}/problem`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
