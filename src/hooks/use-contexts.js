import { useContext } from 'react';
import {
  AuthContext,
  PlaylistsContext,
  HistoryContext,
  LoadingContext,
} from '../contexts';

const useAuth = () => useContext(AuthContext);

const usePlaylists = () => useContext(PlaylistsContext);

const useHistory = () => useContext(HistoryContext);

const useLoading = () => useContext(LoadingContext);

export { useAuth, usePlaylists, useHistory, useLoading };
