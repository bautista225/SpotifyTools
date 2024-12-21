import { createSlice } from "@reduxjs/toolkit";
import storageService from "../services/storage";
import SpotifyService from "../services/spotify";

const initialState = {
  access_token: null,
  token_type: null,
  expires_in: 0,
  expiresAt: 0,
};

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setSession(state, action) {
      return action.payload;
    },
    removeSession() {
      return initialState;
    },
  },
});

export const { setSession, removeSession } = sessionSlice.actions;

export const saveAuthenticatedSession = (session) => {
  return (dispatch) => {
    storageService.saveSession(session);
    SpotifyService.setTokenInfo(session);
    dispatch(setSession(session));
  };
};

export const logoutSession = () => {
  return (dispatch) => {
    console.log('Limpiando sesion')
    storageService.removeSession();
    SpotifyService.setTokenInfo(initialState);
    dispatch(removeSession());
  };
};

export const restartSession = () => {
  return (dispatch) => {
    const session = storageService.loadSession();
    console.log("La sesión es:", session);
    if (session) {
      SpotifyService.setTokenInfo(session);
      if (SpotifyService.hasTokenExpired()) {
        console.log('Voy a limpiar la sesion por token cadudado')
        dispatch(logoutSession())
      } else {
        dispatch(setSession(session));
      }
    }
  };
};

export default sessionSlice.reducer;
