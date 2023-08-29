export const ERROR_CODES = {
  GENERRAL: {
    error_code: 500001,
    title: 'Error',
    message: 'The Internal Server error occurred, please try again later!',
  },
  INVALID_PARAMS: {
    error_code: 500002,
    title: 'Error',
    message: 'Invalid params',
  },
  NOT_FOUND: {
    error_code: 404001,
    title: 'Error',
    message: 'Not found',
  },
  USER_NOT_FOUND: {
    error_code: 404002,
    title: 'Error',
    message: 'User is not found',
  },
  CAR_NOT_FOUND: {
    error_code: 404004,
    title: 'Error',
    message: 'Car is not found',
  },
  ACTION_FORBIDEN: {
    error_code: 403000,
    title: 'Error',
    message: 'Action not allowed',
  },
  BAD_REQUEST: {
    error_code: 400000,
    title: 'Error',
    message: 'Rating must be between 1 and 5',
  },
};
