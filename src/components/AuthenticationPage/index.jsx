import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as utils from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { saveAuthenticatedSession } from "../../reducers/session";
import SpotifyService from "../../services/spotify";
import { devConsoleLog } from "../../utils";

const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();
  // Guards against React 18 StrictMode running the effect twice, which would
  // consume the single-use authorization code and code verifier on the first
  // run and fail the exchange on the second.
  const hasHandledRedirect = useRef(false);
  devConsoleLog(session);

  useEffect(() => {
    if (session.access_token) return navigate("/profile");
    if (hasHandledRedirect.current) return;
    hasHandledRedirect.current = true;

    const completeAuthentication = async () => {
      const { code, state, error } = utils.getAuthorizationResponseFromQuery();
      const storedState = utils.consumeStoredAuthState();
      const codeVerifier = utils.consumeStoredCodeVerifier();
      devConsoleLog({ code, state, error });

      if (error || !code || !codeVerifier || state !== storedState) {
        devConsoleLog("Authorization redirect invalid", {
          error,
          hasCode: !!code,
          hasVerifier: !!codeVerifier,
          stateMatches: state === storedState,
        });
        return navigate("/");
      }

      try {
        const tokenResponse = await SpotifyService.exchangeCodeForToken(
          code,
          codeVerifier
        );
        const newSession = utils.buildSessionFromTokenResponse(tokenResponse);
        dispatch(saveAuthenticatedSession(newSession));
        navigate("/profile");
      } catch (exchangeError) {
        console.error("Token exchange failed", exchangeError);
        navigate("/");
      }
    };

    completeAuthentication();
  }, [session.access_token]);
};

export default AuthenticationPage;
