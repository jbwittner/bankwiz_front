import { Configuration } from '@jbwittner/bankwiz_openapi-client';
import { useState } from 'react';

const confBack: Configuration = new Configuration({
  baseOptions: {
    withCredentials: true,
  },
  basePath: '/api',
});

function useApiRequestWithArguments<T, V>(
  // eslint-disable-next-line no-unused-vars
  apiMethod: (requestParameter: T) => Promise<{ data: V }>,
) {
  const [data, setData] = useState<V | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async (requestObject: T) => {
    setIsLoading(true);
    try {
      const response = await apiMethod(requestObject);
      setData(response.data);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  return { sendRequest, data, isLoading, error };
}

function useApiRequestWithoutArgument<T>(
  apiMethod: () => Promise<{ data: T }>,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const sendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await apiMethod();
      setData(response.data);
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  return { sendRequest, data, isLoading, error };
}

export { useApiRequestWithArguments, useApiRequestWithoutArgument, confBack };
