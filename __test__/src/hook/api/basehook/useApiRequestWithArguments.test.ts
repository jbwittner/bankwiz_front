import { ApiError, useApiRequestWithArguments } from '@/hook/api/BaseHook';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useApiRequestWithArguments', () => {
  const mockApiMethod = vi.fn();
  const mockRequestObject = { id: 123 };
  const mockSuccessCallback = vi.fn();
  const mockErrorInterpreter = vi.fn();
  const mockErrorCallback = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should call the API method with the provided request object', async () => {
    mockApiMethod.mockResolvedValueOnce({ data: true });

    const { result, rerender } = renderHook(() =>
      useApiRequestWithArguments(mockApiMethod, vi.fn(), {}),
    );

    await result.current.sendRequest(mockRequestObject);
    rerender();

    expect(mockApiMethod).toHaveBeenCalledWith(mockRequestObject);
  });

  it('should set the data and call the success callback if the request is successful', async () => {
    const mockResponse = { data: true };
    mockApiMethod.mockResolvedValueOnce(mockResponse);

    const { result, rerender } = renderHook(() =>
      useApiRequestWithArguments<any, boolean>(
        mockApiMethod,
        mockErrorInterpreter,
        {
          onSuccess: mockSuccessCallback,
          onError: mockErrorCallback,
        },
      ),
    );

    await result.current.sendRequest(mockRequestObject);
    rerender();

    expect(result.current.data).toEqual(mockResponse.data);
    expect(mockSuccessCallback).toHaveBeenCalledWith(mockResponse.data);
  });

  it('should not call the error interpreter if the response format are not good and set the error and call the error callback if the request fails with an API error', async () => {
    const mockErrorResponse = {
      response: { data: { error: 'API error' }, status: 400 },
    };
    mockApiMethod.mockRejectedValueOnce(mockErrorResponse);

    mockErrorInterpreter.mockImplementation(() => {
      throw new Error('oh no');
    });

    const { result, rerender } = renderHook(() =>
      useApiRequestWithArguments(mockApiMethod, mockErrorInterpreter, {
        onSuccess: mockSuccessCallback,
        onError: mockErrorCallback,
      }),
    );

    await result.current.sendRequest(mockRequestObject);
    rerender();

    expect(result.current.error).toEqual(mockErrorResponse);
    expect(mockErrorCallback).toHaveBeenCalledWith(mockErrorResponse);
  });

  it('should call the error interpreter if the response format are good and set the error and call the error callback if the request fails with an API error', async () => {
    const mockErrorResponse: ApiError = {
      code: '400',
      message: 'API error',
      request: {
        status: 400,
      },
    };

    mockApiMethod.mockRejectedValueOnce(mockErrorResponse);

    const { result, rerender } = renderHook(() =>
      useApiRequestWithArguments(mockApiMethod, mockErrorInterpreter, {
        onSuccess: mockSuccessCallback,
        onError: mockErrorCallback,
      }),
    );

    await result.current.sendRequest(mockRequestObject);
    rerender();

    expect(result.current.error).toEqual(mockErrorResponse);
    expect(mockErrorInterpreter).toHaveBeenCalledWith(mockErrorResponse);
    expect(mockErrorCallback).toHaveBeenCalledWith(mockErrorResponse);
  });
});
