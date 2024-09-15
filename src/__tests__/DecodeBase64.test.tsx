import decodeBase64 from '@/utils/decodeBase64';
import toast from 'react-hot-toast';
import '@testing-library/jest-dom';

jest.mock('react-hot-toast', () => ({
  error: jest.fn()
}));

describe('decodeBase64', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should decode a valid Base64 string', () => {
    const encodedString = btoa(encodeURIComponent('Hello, World!'));
    const result = decodeBase64(encodedString);
    expect(result).toBe('Hello, World!');
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should return an empty string and log an error when decoding fails', () => {
    const invalidString = '%invalid%';
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const result = decodeBase64(invalidString);
    expect(result).toBe('');
    expect(console.error).toHaveBeenCalledWith(
      'Error decoding base64 string:',
      expect.any(Error)
    );
    expect(toast.error).toHaveBeenCalledWith('Error decoding base64');
    consoleSpy.mockRestore();
  });

  it('should handle empty strings and not call toast.error', () => {
    const result = decodeBase64('');
    expect(result).toBe('');
    expect(toast.error).not.toHaveBeenCalled();
  });
});
