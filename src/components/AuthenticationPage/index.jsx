import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as utils from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { saveAuthenticatedSession } from "../../reducers/session";

const AuthenticationPage = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (session.access_token) return navigate("/profile");

    const tokenInfo = utils.getAuthorizationTokenFromHash();
    console.log(tokenInfo)
    if (tokenInfo.access_token) {
      dispatch(saveAuthenticatedSession(tokenInfo));
      navigate("/profile");
    } else {
      navigate("/");
    }
  }, [session.access_token]);
};

export default AuthenticationPage;
