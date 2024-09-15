import React from 'react';
import handleKeyDown from '@/utils/handleKeyDown';

describe('handleKeyDown', () => {
  const mockSetQuery = jest.fn();
  const createEvent = (
    key: string,
    value: string,
    selectionStart: number,
    selectionEnd: number
  ): React.KeyboardEvent<HTMLTextAreaElement> => {
    return {
      key,
      target: {
        value,
        selectionStart,
        selectionEnd
      } as HTMLTextAreaElement,
      preventDefault: jest.fn(),
      altKey: false,
      charCode: 0,
      ctrlKey: false,
      keyCode: 0,
      metaKey: false,
      shiftKey: false,
      code: '',
      which: 0,
      getModifierState: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle opening bracket {', () => {
    const event = createEvent('{', 'test', 4, 4);
    handleKeyDown({ e: event, setQuery: mockSetQuery });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockSetQuery).toHaveBeenCalledWith('test{}');
  });

  it('should handle opening bracket [', () => {
    const event = createEvent('[', 'test', 4, 4);
    handleKeyDown({ e: event, setQuery: mockSetQuery });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockSetQuery).toHaveBeenCalledWith('test[]');
  });

  it('should handle opening bracket (', () => {
    const event = createEvent('(', 'test', 4, 4);
    handleKeyDown({ e: event, setQuery: mockSetQuery });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockSetQuery).toHaveBeenCalledWith('test()');
  });

  it('should handle opening quote "', () => {
    const event = createEvent('"', 'test', 4, 4);
    handleKeyDown({ e: event, setQuery: mockSetQuery });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(mockSetQuery).toHaveBeenCalledWith('test""');
  });
});
