import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EndpointInput from '@/components/graphQL/endpointInut/EndpointInput';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('EndpointInput Component', () => {
  const mockSetEndpointUrl = jest.fn();
  const mockSetSdlUrl = jest.fn();

  const renderComponent = (endpointUrl = '', sdlUrl = '') => {
    render(
      <EndpointInput
        endpointUrl={endpointUrl}
        setEndpointUrl={mockSetEndpointUrl}
        sdlUrl={sdlUrl}
        setSdlUrl={mockSetSdlUrl}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render input fields with the correct initial values', () => {
    renderComponent('http://example.com', 'http://example.com');

    const endpointInput = screen.getByLabelText('endpoint_url:');
    const sdlInput = screen.getByLabelText('SDL URL:');

    expect(endpointInput).toBeInTheDocument();
    expect(endpointInput).toHaveValue('http://example.com');

    expect(sdlInput).toBeInTheDocument();
    expect(sdlInput).toHaveValue('http://example.com');
  });

  it('should call setEndpointUrl and setSdlUrl with correct values when typing in the endpoint URL input', () => {
    renderComponent('http://example.com', 'http://example.com?sdl');

    const endpointInput = screen.getByLabelText('endpoint_url:');

    fireEvent.change(endpointInput, {
      target: { value: 'http://new-url.com' }
    });

    expect(mockSetEndpointUrl).toHaveBeenCalledWith('http://new-url.com');
    expect(mockSetSdlUrl).toHaveBeenCalledWith('http://new-url.com?sdl');
  });

  it('should update both inputs when typing in the SDL input', () => {
    renderComponent('http://example.com', 'http://example.com?sdl');

    const sdlInput = screen.getByLabelText('SDL URL:');

    fireEvent.change(sdlInput, { target: { value: 'http://another-url.com' } });

    expect(mockSetEndpointUrl).toHaveBeenCalledWith('http://another-url.com');
    expect(mockSetSdlUrl).toHaveBeenCalledWith('http://another-url.com?sdl');
  });

  it('should handle empty input values', () => {
    renderComponent();

    const endpointInput = screen.getByLabelText('endpoint_url:');
    const sdlInput = screen.getByLabelText('SDL URL:');

    expect(endpointInput).toHaveValue('');
    expect(sdlInput).toHaveValue('');
  });
});
