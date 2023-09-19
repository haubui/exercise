export interface BaseResponse<T> {
  success?: boolean;
  status_code: number;
  data: T;
}
