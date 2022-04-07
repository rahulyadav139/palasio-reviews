import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth-context';
import { PlaylistsContext, PlaylistsProvider } from './use-playlists';
import { HistoryContext, HistoryProvider } from './use-history';

const Providers = props => {
  return (
    <AuthProvider>
      <Router>
        <HistoryProvider>
          <PlaylistsProvider>{props.children}</PlaylistsProvider>
        </HistoryProvider>
      </Router>
    </AuthProvider>
  );
};
export { Providers, AuthContext, PlaylistsContext, HistoryContext };
