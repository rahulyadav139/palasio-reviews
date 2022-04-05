import { useContext } from 'react';
import {
  AuthContext,
  PlaylistsContext,
  HistoryContext,
  LoadingContext,
  LikedVideosContext,
  ToastContext,
} from '../contexts';

const useAuth = () => useContext(AuthContext);

const usePlaylists = () => useContext(PlaylistsContext);

const useHistory = () => useContext(HistoryContext);

const useLoading = () => useContext(LoadingContext);

const useLikedVideos = () => useContext(LikedVideosContext);

const useToast = () => useContext(ToastContext);

export {
  useAuth,
  usePlaylists,
  useHistory,
  useLoading,
  useLikedVideos,
  useToast,
};
