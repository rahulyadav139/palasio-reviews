import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth-context';
import { PlaylistsContext, PlaylistsProvider } from './use-playlists';

const Providers = props => {
  return (
    <AuthProvider>
      <Router>
        <PlaylistsProvider>{props.children}</PlaylistsProvider>
      </Router>
    </AuthProvider>
  );
};
export { Providers, AuthContext, PlaylistsContext };
