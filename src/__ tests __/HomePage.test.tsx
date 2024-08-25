import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from '@/store/store'; // Import RootState type
import Home from '@/app/page'; // Adjust the import path according to your project structure

// Mock components if necessary
jest.mock('@/components/mainPage/welcomeContent/WelcomeContent', () => ({
  WelcomeContent: () => <div data-testid="mock-welcome-content">Welcome Content</div>,
}));

jest.mock('@/components/mainPage/blockBtnApps/BlockBtnApps', () => ({
  BlockBtnApps: () => <div data-testid="mock-block-btn-apps">Block Btn Apps</div>,
}));

const mockStore = configureMockStore<RootState>(); // Specify RootState type for the store

describe('Home Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      user: {
        userName: '',
        userIsLogged: false, // Initial state: user not logged in
      },
    });
  });

  it('should render WelcomeContent and not render BlockBtnApps when user is not logged in', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId('children-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-welcome-content')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-block-btn-apps')).not.toBeInTheDocument();
  });

  it('should render BlockBtnApps when user is logged in', () => {
    store = mockStore({
      user: {
        userName: 'John Doy',
        userIsLogged: true, // User is logged in
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId('children-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-welcome-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-block-btn-apps')).toBeInTheDocument();
  });
});