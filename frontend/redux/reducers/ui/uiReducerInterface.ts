export interface UiToasterPayload {
  type: "success" | "error" | "info";
  message: string;
}

export interface UiReducerInterface {
  isGlobalLoader: boolean;
  toaster: UiToasterPayload | null;
}
