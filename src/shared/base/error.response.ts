export interface ErrorResponse {
  success?: boolean;
  status_code: string;
  timestamp: string;
  path: string;
  error: any;
}

export interface Error {
  code?: string;
  title?: string;
  message?: string;
  errors?: Array<DetailError> | null;
}

export interface DetailError {
  code?: string;
  field?: string;
  message?: string;
}
