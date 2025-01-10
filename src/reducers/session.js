import { createSlice } from "@reduxjs/toolkit";
import storageService from "../services/storage";
import SpotifyService from "../services/spotify";
import { devConsoleLog } from "../utils";

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
    devConsoleLog('Limpiando sesion')
    storageService.removeSession();
    SpotifyService.setTokenInfo(initialState);
    dispatch(removeSession());
  };
};

export const restartSession = (onExpiredSession) => {
  return (dispatch) => {
    const session = storageService.loadSession();
    devConsoleLog("La sesión es:", session);
    if (session) {
      SpotifyService.setTokenInfo(session);
      if (SpotifyService.hasTokenExpired()) {
        devConsoleLog('Voy a limpiar la sesion por token cadudado')
        dispatch(logoutSession())
        onExpiredSession()
      } else {
        dispatch(setSession(session));
      }
    }
  };
};

export default sessionSlice.reducer;
