import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyService from "../../services/spotify";
import utils from "../../utils";

const AuthenticationPage = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) return;

    const accessToken = utils.getAuthorizationTokenFromHash();
    if (accessToken) {
      SpotifyService.setToken(accessToken);
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, [token, navigate]);
};

export default AuthenticationPage;
