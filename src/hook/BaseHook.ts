/* eslint-disable no-unused-vars */
import { Configuration } from '@jbwittner/bankwiz_openapi-client';
import { useState } from 'react';

export type ApiError = {
  code: string;
  message: string;
  request: {
    status: number;
  };
};

export type ApiRequestOptions<T> = {
  onSuccess?: (response: T) => void;
  onError?: (error: any) => void;
};

enum ErrorCode {
  ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE',
  ERR_BAD_OPTION = 'ERR_BAD_OPTION',
  ECONNABORTED = 'ECONNABORTED',
  ETIMEDOUT = 'ETIMEDOUT',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS',
  ERR_DEPRECATED = 'ERR_DEPRECATED',
  ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE',
  ERR_BAD_REQUEST = 'ERR_BAD_REQUEST',
  ERR_CANCELED = 'ERR_CANCELED',
  ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT',
  ERR_INVALID_URL = 'ERR_INVALID_URL',
}

function isApiError(obj: any): obj is ApiError {
  return (
    typeof obj.code === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.request.status === 'number'
  );
}

const confBack: Configuration = new Configuration({
  baseOptions: {
    withCredentials: true,
  },
  basePath: '/api',
});

function useApiRequestWithArguments<T, V>(
  apiMethod: (requestParameter: T) => Promise<{ data: V }>,
  errorInterpreter: (error: ApiError) => void,
  options: ApiRequestOptions<V> = {}
) {
  const [data, setData] = useState<V | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async (requestObject: T) => {
    setIsLoading(true);
    try {
      const response = await apiMethod(requestObject);
      setData(response.data);
      options.onSuccess && options.onSuccess(response.data);
    } catch (err: any) {
      console.log(err);
      if (isApiError(err)) {
        errorInterpreter(err);
      }
      options.onError && options.onError(err);
      setError(err);
    }

    setIsLoading(false);
  };

  return { sendRequest, data, isLoading, error };
}


function useApiRequestWithoutArgument<T>(
  apiMethod: () => Promise<{ data: T }>,
  errorInterpreter: (error: ApiError) => void,
  options: ApiRequestOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await apiMethod();
      setData(response.data);
      options.onSuccess && options.onSuccess(response.data);
    } catch (err: any) {
      console.log(err);
      if (isApiError(err)) {
        errorInterpreter(err);
      }
      options.onError && options.onError(err);
      setError(err);
    }

    setIsLoading(false);
  };

  return { sendRequest, data, isLoading, error };
}

export {
  ErrorCode,
  confBack,
  useApiRequestWithArguments,
  useApiRequestWithoutArgument,
};
