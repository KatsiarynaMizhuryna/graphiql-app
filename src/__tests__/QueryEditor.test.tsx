import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryEditor from '@/components/graphQL/queryEditor/QueryEditor';
import handleKeyDown from '@/utils/handleKeyDown';

jest.mock('@/utils/handleKeyDown');

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'GraphClientPage.query_placeholder': 'Type your query here...'
    };
    return translations[key] || key;
  }
}));

describe('QueryEditor Component', () => {
  it('should render correctly with given props', () => {
    const query = 'query { test }';
    const setQuery = jest.fn();
    const onBlur = jest.fn();

    render(<QueryEditor query={query} setQuery={setQuery} onBlur={onBlur} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(query);
  });

  it('should update the query state on change', () => {
    const query = 'query { test }';
    const setQuery = jest.fn();
    const onBlur = jest.fn();

    render(<QueryEditor query={query} setQuery={setQuery} onBlur={onBlur} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'query { updated }' } });

    expect(setQuery).toHaveBeenCalledWith('query { updated }');
  });

  it('should trigger onBlur when the textarea loses focus', () => {
    const query = 'query { test }';
    const setQuery = jest.fn();
    const onBlur = jest.fn();
    render(<QueryEditor query={query} setQuery={setQuery} onBlur={onBlur} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.blur(textarea);

    expect(onBlur).toHaveBeenCalled();
  });

  it('should handle key down events', () => {
    const query = 'query { test }';
    const setQuery = jest.fn();
    const onBlur = jest.fn();

    render(<QueryEditor query={query} setQuery={setQuery} onBlur={onBlur} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, {
      key: '{',
      code: 'BracketLeft',
      charCode: 123
    });

    expect(handleKeyDown).toHaveBeenCalled();
  });
});
