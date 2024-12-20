import { createSlice } from "@reduxjs/toolkit";
import SpotifyService from "../services/spotify";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return initialState;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await SpotifyService.getUserProfile();
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
