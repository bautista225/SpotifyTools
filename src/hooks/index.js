import { useDispatch } from "react-redux";
import { logoutSession, restartSession } from "../reducers/session";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SpotifyService from "../services/spotify";

export const useInitialization = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(restartSession());
  };
};

export const useErrorHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = (error) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
    } else if (error.response?.data?.error) {
      console.error(error.response.data.error);
      const { status } = error.response.data.error;
      if (status === 401) {
        dispatch(logoutSession());
        navigate("/");
      }
    } else console.error(error);
  };

  return handleError;
};

export const useUserProfile = () => {
  const handleError = useErrorHandler();
  const [userProfile, setUserProfile] = useState(null);

  const loadUserProfile = useCallback(() => {
    SpotifyService.getUserProfile()
      .then((userInfo) => setUserProfile(userInfo))
      .catch((error) => handleError(error));
  }, [handleError]);

  useEffect(() => {
    loadUserProfile();
  }, []);

  return [userProfile, loadUserProfile];
};

export const useUserTopTracks = (timeRange, numberOfTracks) => {
  const handleError = useErrorHandler();
  const [userTopTracks, setUserTopTracks] = useState(null);

  const loadUserTopTracks = useCallback(
    (timeRange, numberOfTracks) => {
      SpotifyService.getUserTopTracks(timeRange, numberOfTracks)
        .then((userTopTracks) => {
          setUserTopTracks(userTopTracks);
        })
        .catch((error) => handleError(error));
    },
    [handleError]
  );

  useEffect(() => {
    loadUserTopTracks(timeRange, numberOfTracks);
  }, []);

  return [userTopTracks, loadUserTopTracks];
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
        console.log({ finalPlaylistsInfo });
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
