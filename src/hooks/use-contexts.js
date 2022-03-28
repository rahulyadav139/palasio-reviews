import { useContext } from 'react';
import { AuthContext, PlaylistsContext, HistoryContext } from '../contexts';

const useAuth = () => useContext(AuthContext);

const usePlaylists = () => useContext(PlaylistsContext);

const useHistory = () => useContext(HistoryContext);

export { useAuth, usePlaylists, useHistory };
