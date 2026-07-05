import { createSlice } from "@reduxjs/toolkit";
import storageService from "../services/storage";
import SpotifyService from "../services/spotify";
import { buildSessionFromTokenResponse, devConsoleLog } from "../utils";

const initialState = {
  access_token: null,
  token_type: null,
  expires_in: 0,
  expiresAt: 0,
  refresh_token: null,
  scope: null,
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

// Exchanges the refresh token for a new access token and persists the renewed
// session. Spotify may omit refresh_token in the response, in which case we keep
// the previous one. Throws if there is no refresh token to use.
export const refreshSession = (session) => {
  return async (dispatch) => {
    if (!session?.refresh_token) throw new Error("No refresh token available");

    const tokenResponse = await SpotifyService.refreshAccessToken(
      session.refresh_token
    );
    const newSession = buildSessionFromTokenResponse({
      ...tokenResponse,
      refresh_token: tokenResponse.refresh_token || session.refresh_token,
    });

    dispatch(saveAuthenticatedSession(newSession));
    return newSession;
  };
};

export const restartSession = (onExpiredSession) => {
  return async (dispatch) => {
    const session = storageService.loadSession();
    devConsoleLog("La sesión es:", session);
    if (!session) return;

    SpotifyService.setTokenInfo(session);
    if (!SpotifyService.hasTokenExpired()) {
      dispatch(setSession(session));
      return;
    }

    // Token expired: try to silently renew it before giving up on the session.
    if (session.refresh_token) {
      try {
        devConsoleLog("Token caducado, intentando refrescar");
        await dispatch(refreshSession(session));
        return;
      } catch (error) {
        devConsoleLog("No se pudo refrescar la sesion", error);
      }
    }

    devConsoleLog("Voy a limpiar la sesion por token cadudado");
    dispatch(logoutSession());
    onExpiredSession();
  };
};

export default sessionSlice.reducer;
