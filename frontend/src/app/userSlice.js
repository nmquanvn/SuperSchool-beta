import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('user/logout', async (data) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  window.location.reload();
  return;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLogin: false,
  },
  reducers: {
    checkLogin: (state, action) => {
      const { isLogin, user } = action.payload;
      state.isLogin = isLogin;
      state.user = user;
    },
  },
});

export const { checkLogin } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export default userReducer;
