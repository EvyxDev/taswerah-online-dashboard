// api.d.ts
declare type DatabaseProperies = {
  _id: string;
  createdAt: string;
};

declare type SuccessfulResponse<T> = {
  success: true;
  message: string;
  data: T;
};

declare type ErrorResponse = {
  success: boolean;
  message: string;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
