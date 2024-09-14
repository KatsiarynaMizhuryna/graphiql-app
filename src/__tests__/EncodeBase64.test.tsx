import encodeBase64 from '@/utils/encodeBase64';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  error: jest.fn()
}));

describe('encodeBase64', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly encode a string to base64', () => {
    const data = 'Hello World';
    const expectedBase64 = btoa(data);

    const result = encodeBase64(data);

    expect(result).toBe(expectedBase64);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should return an empty string and log an error when encoding fails', () => {
    const data = 'Hello World';
    const btoaSpy = jest.spyOn(global, 'btoa').mockImplementation(() => {
      throw new Error('Mocked encoding error');
    });

    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = encodeBase64(data);

    expect(result).toBe('');
    expect(console.error).toHaveBeenCalledWith(
      'Error encoding to base64:',
      expect.any(Error)
    );
    expect(toast.error).toHaveBeenCalledWith('Error encoding to base64');

    btoaSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
