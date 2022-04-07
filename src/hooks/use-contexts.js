import { useContext } from 'react';
import { AuthContext, PlaylistsContext } from '../contexts';

const useAuth = () => useContext(AuthContext);

const usePlaylists = () => useContext(PlaylistsContext);

export { useAuth, usePlaylists };
