const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const request = async <T>(
  method: string,
  url: string,
  payload?: unknown
): Promise<T> => {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
};

export const StoreGet = <T>(url: string) => request<T>("GET", url);
export const StorePost = <T>(url: string, payload: unknown) =>
  request<T>("POST", url, payload);
export const StorePut = <T>(url: string, payload: unknown) =>
  request<T>("PUT", url, payload);
export const StoreDelete = <T>(url: string) => request<T>("DELETE", url);
