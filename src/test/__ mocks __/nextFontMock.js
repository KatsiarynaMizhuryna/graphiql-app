export const getFontMock = () => ({
  Nunito: jest.fn(() => ({
    className: 'mocked-nunito-font',
  })),
  Oswald: jest.fn(() => ({
    className: 'mocked-oswald-font',
  })),
  Ubuntu: jest.fn(() => ({
    className: 'mocked-ubuntu-font',
  }))
})