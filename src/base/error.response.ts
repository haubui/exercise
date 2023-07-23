export interface ErrorResponse {
  success?: boolean;
  status_code: number;
  timestamp: string;
  path: string;
  error: any;
}

export interface Error {
  code?: number;
  title?: string;
  message?: string;
  errors?: Array<DetailError> | null;
}

export interface DetailError {
  code?: number;
  field?: string;
  message?: string;
}
