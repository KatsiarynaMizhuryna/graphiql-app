// import { render, screen, fireEvent } from '@testing-library/react';
// import { Header } from '@/components/header/Header';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { jest } from '@jest/globals';
// import '@testing-library/jest-dom';

// // Mock dependencies
// jest.mock('react-firebase-hooks/auth');
// jest.mock('firebase/auth', () => ({
//   getAuth: jest.fn(() => ({
//     currentUser: null,
//     signInWithEmailAndPassword: jest.fn(),
//     signOut: jest.fn(),
//   })),
// }));

// // Mock next/router
// const mockPush = jest.fn();
// jest.mock('next/router', () => ({
//   useRouter: () => ({
//     push: mockPush,
//     pathname: '/',
//     query: {},
//     asPath: '/',
//   }),
// }));

// describe('Header Component', () => {
//   beforeEach(() => {
//     // Reset mocks before each test
//     (useAuthState as jest.Mock).mockReturnValue([null, false, null]); // Default: user is not logged in, not loading, no error
//   });

//   test('renders the Header component', () => {
//     render(<Header />);
//     const headerElement = screen.getByTestId('header');
//     expect(headerElement).toBeInTheDocument();
//   });

//   test('header has sticky class when scrolled past 150px', () => {
//     render(<Header />);

//     // Simulate scroll past 150px
//     fireEvent.scroll(window, { target: { scrollY: 200 } });
//     const headerElement = screen.getByTestId('header');
//     expect(headerElement).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg transform translate-y-0 animate-slideDown');

//     // Simulate scroll back to 0
//     fireEvent.scroll(window, { target: { scrollY: 0 } });
//     expect(headerElement).not.toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg transform translate-y-0 animate-slideDown');
//   });

//   test('renders BlockBtnNotLogged when user is not logged in', () => {
//     (useAuthState as jest.Mock).mockReturnValue([null, false, null]); // User not logged in, not loading, no error
//     render(<Header />);

//     expect(screen.getByText(/Sign IN/i)).toBeInTheDocument(); // Assuming the button has "Login" text
//   });

//   test('renders BlockBtnIsLogged when user is logged in', () => {
//     (useAuthState as jest.Mock).mockReturnValue([{ uid: '123' }, false, null]); // User is logged in, not loading, no error
//     render(<Header />);

//     expect(screen.getByText(/Sign OUT/i)).toBeInTheDocument(); // Assuming the button has "Logout" text
//   });

//   test('adds and removes the scroll event listener', () => {
//     const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
//     const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

//     const { unmount } = render(<Header />);

//     expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

//     unmount();

//     expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
//   });
// });
