type ServerResponse<T> = {
  code: number;
  message: string;
  success: boolean;
  data: T;
};

type AxiosServerResponse<T> = Promise<ServerResponse<T>>;
