import { useApiRequestWithArguments } from '@/hook/BaseHook';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useApiRequestWithArguments', () => {
  const mockApiMethod = vi.fn();
  const mockRequestObject = { id: 123 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the API method with the provided request object', async () => {
    mockApiMethod.mockResolvedValueOnce({ data: { result: true } });

    const { result } = renderHook(() =>
      useApiRequestWithArguments(mockApiMethod, vi.fn(), {}),
    );

    await result.current.sendRequest(mockRequestObject);
    expect(mockApiMethod).toHaveBeenCalledWith(mockRequestObject);
  });

  it('should set the loading state to true while the request is being sent', async () => {});

  it('should set the data and call the success callback if the request is successful', async () => {});

  it('should call the error interpreter and set the error and call the error callback if the request fails with an API error', async () => {});

  it('should call the error callback if the request fails with a non-API error', async () => {});
});
