import { useDispatch } from "react-redux";
import { logoutSession, restartSession } from "../reducers/session";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SpotifyService from "../services/spotify";
import { initializeUser, logoutUser } from "../reducers/user";
import { devConsoleLog } from "../utils";

export const useSessionInitialization = () => {
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const onExpiredSession = () => {
    handleError(SpotifyService.TOKEN_EXPIRATION_ERROR);
  };

  return () => {
    dispatch(restartSession(onExpiredSession));
  };
};

export const useUserInitialization = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(initializeUser());
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(logoutSession());
    dispatch(logoutUser());
    navigate("/");
  };
};

export const useErrorHandler = () => {
  const logout = useLogout();

  const handleError = (error) => {
    if (error.status === 401) {
      console.log(error.message);
      logout();
    } else if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
    } else if (error.response?.data?.error) {
      console.error(error.response.data.error);
      const { status, message } = error.response.data.error;
      if (status === 401) {
        console.log(message);
        logout();
      }
    } else console.error(error);
  };

  return handleError;
};

export const useUserProfile = () => {
  const handleError = useErrorHandler();
  const [userProfile, setUserProfile] = useState(null);
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true);

  const loadUserProfile = useCallback(() => {
    setIsUserProfileLoading(true);
    SpotifyService.getUserProfile()
      .then((userInfo) => {
        setIsUserProfileLoading(false);
        setUserProfile(userInfo);
      })
      .catch((error) => {
        setIsUserProfileLoading(false);
        handleError(error);
      });
  }, [handleError]);

  useEffect(() => {
    loadUserProfile();
  }, []);

  return [userProfile, isUserProfileLoading, loadUserProfile];
};

export const useUserTopTracks = (timeRange, numberOfTracks) => {
  const handleError = useErrorHandler();
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [isUserTopTracksLoading, setIsUserTopTracksLoading] = useState(true);

  const loadUserTopTracks = useCallback(
    (timeRange, numberOfTracks) => {
      setIsUserTopTracksLoading(true);
      SpotifyService.getUserTopTracks(timeRange, numberOfTracks)
        .then((userTopTracks) => {
          setUserTopTracks(userTopTracks);
          setIsUserTopTracksLoading(false);
        })
        .catch((error) => {
          setIsUserTopTracksLoading(false);
          handleError(error);
        });
    },
    [handleError]
  );

  useEffect(() => {
    loadUserTopTracks(timeRange, numberOfTracks);
  }, []);

  return [userTopTracks, isUserTopTracksLoading, loadUserTopTracks];
};

export const useUserTopArtists = (timeRange, numberOfArtists) => {
  const handleError = useErrorHandler();
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [isUserTopArtistsLoading, setIsUserTopArtistsLoading] = useState(true);

  const loadUserTopArtists = useCallback(
    (timeRange, numberOfArtists) => {
      setIsUserTopArtistsLoading(true);
      SpotifyService.getUserTopArtists(timeRange, numberOfArtists)
        .then((userTopTracks) => {
          setUserTopArtists(userTopTracks);
          setIsUserTopArtistsLoading(false);
        })
        .catch((error) => {
          setIsUserTopArtistsLoading(false);
          handleError(error);
        });
    },
    [handleError]
  );

  useEffect(() => {
    loadUserTopArtists(timeRange, numberOfArtists);
  }, []);

  return [userTopArtists, isUserTopArtistsLoading, loadUserTopArtists];
};

export const useUserPlaylists = () => {
  const handleError = useErrorHandler();
  const [userPlaylists, setUserPlaylists] = useState(null);

  const loadUserPlaylists = useCallback(() => {
    SpotifyService.getUserPlaylists(50)
      .then((playlistsInfo) => {
        const fetchRemainingPlaylists = (currentInfo) => {
          if (currentInfo.items.length >= currentInfo.total) {
            return Promise.resolve(currentInfo);
          }

          return SpotifyService.getUserPlaylists(
            50,
            currentInfo.items.length
          ).then(({ items, next }) => {
            currentInfo.items = currentInfo.items.concat(items);
            currentInfo.next = next;
            return fetchRemainingPlaylists(currentInfo);
          });
        };

        return fetchRemainingPlaylists(playlistsInfo);
      })
      .then((finalPlaylistsInfo) => {
        devConsoleLog({ finalPlaylistsInfo });
        setUserPlaylists(finalPlaylistsInfo);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError]);

  useEffect(() => {
    loadUserPlaylists();
  }, []);

  return [userPlaylists, loadUserPlaylists];
};
