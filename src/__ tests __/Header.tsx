// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Header } from '@/components/header/Header';
// import { fireEvent } from '@testing-library/dom';
// import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
// import { Provider } from 'react-redux';

// jest.mock('@/components/header/logo/Logo', () => ({
//   Logo: () => <div data-testid="logo" />
// }));

// jest.mock('@/components/header/switcher/Switcher', () => ({
//   Switcher: () => <div data-testid="switcher" />
// }));

// jest.mock('@/components/header/blockBtnIsLogged/BlockBtnIsLogged', () => ({
//   BlockBtnIsLogged: () => <div data-testid="blockBtnIsLogged" />
// }));

// jest.mock('@/components/header/blockBtnNotLogged/BlockBtnNotLogged', () => ({
//   BlockBtnNotLogged: () => <div data-testid="blockBtnNotLogged" />
// }));

// const mockStore = configureMockStore<RootState>();

// describe('Header Component', () => {
//   let store: MockStoreEnhanced<RootState>;

//   beforeEach(() => {
//     store = mockStore({
//       user: {
//         userIsLogged: false,
//         userName: ''
//       }
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders Logo, Switcher, and BlockBtnNotLogged components when user is not logged in', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     expect(screen.getByTestId('logo')).toBeInTheDocument();
//     expect(screen.getByTestId('switcher')).toBeInTheDocument();
//     expect(screen.getByTestId('blockBtnNotLogged')).toBeInTheDocument();
//   });

//   it('renders BlockBtnIsLogged when user is logged in', () => {
//     store = mockStore({
//       user: {
//         userIsLogged: true,
//         userName: 'Jane Doy'
//       }
//     });

//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     expect(screen.getByTestId('blockBtnIsLogged')).toBeInTheDocument();
//     expect(screen.queryByTestId('blockBtnNotLogged')).not.toBeInTheDocument();
//   });

//   it('applies sticky class when scrolled past 150px', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     const header = screen.getByTestId('header');
//     expect(header).not.toHaveClass('fixed');

//     fireEvent.scroll(window, { target: { scrollY: 200 } });

//     expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');
//   });

//   it('removes sticky class when scrolled back to top', () => {
//     render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );

//     const header = screen.getByTestId('header');

//     fireEvent.scroll(window, { target: { scrollY: 200 } });
//     expect(header).toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');

//     fireEvent.scroll(window, { target: { scrollY: 100 } });

//     expect(header).not.toHaveClass('fixed shadow-lg py-2 backdrop-blur-lg');
//   });

//   it('removes event listener on unmount', () => {
//     const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

//     const { unmount } = render(
//       <Provider store={store}>
//         <Header />
//       </Provider>
//     );
//     unmount();

//     expect(removeEventListenerSpy).toHaveBeenCalledWith(
//       'scroll',
//       expect.any(Function)
//     );
//   });
// });
