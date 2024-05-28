export const wrapServerSuccess = <T>(data: T): ServerResponse<T> => ({
  code: 0,
  message: 'success',
  data,
  success: true,
});

export const wrapServerError = <T>(code: number, message?: string, data?: T): ServerResponse<T> => ({
  code,
  message: message || 'error',
  data: data!,
  success: true,
});
