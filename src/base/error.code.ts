export const ERROR_CODES = {
  GENERRAL: {
    error_code: 'GEN-0500',
    title: 'Error',
    message: 'The Internal Server error occurred, please try again later!',
  },
  NOT_FOUND: {
    error_code: 'GEN-1404',
    title: 'Error',
    message: 'Not found',
  },
  USER_NOT_FOUND: {
    error_code: 'GEN-2404',
    title: 'Error',
    message: 'User is not found',
  },
  CAR_NOT_FOUND: {
    error_code: 'GEN-4404',
    title: 'Error',
    message: 'Car is not found',
  },
  CAR_NOT_AVAILABLE: {
    error_code: 'GEN-5404',
    title: 'Error',
    message: 'Car is not available',
  },
  ACTION_FORBIDEN: {
    error_code: 'GEN-0403',
    title: 'Error',
    message: 'Action not allowed',
  },
  BAD_REQUEST: {
    error_code: 'GEN-0400',
    title: 'Error',
    message: 'Parameter is not valid',
  },
  UNAUTHORIZED: {
    error_code: 'GEN-0401',
    title: 'Unauthorized',
    message: 'Your session has expired, please try again!',
  },
};
