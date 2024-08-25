import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  userIsLogged: boolean;
}

const initialState: UserState = {
  userName: 'gtgtg',
  userIsLogged: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<string>) {
      state.userIsLogged = true;
      state.userName = action.payload;
    },
    logOut(state) {
      state.userIsLogged = false;
      state.userName = '';
    }
  }
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
