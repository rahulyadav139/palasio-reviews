import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth-context';
import { PlaylistsContext, PlaylistsProvider } from './use-playlists';
import { HistoryContext, HistoryProvider } from './use-history';
import { LoadingContext, LoadingProvider } from './use-loading';

const Providers = props => {
  return (
    <AuthProvider>
      <Router>
        <LoadingProvider>
          <HistoryProvider>
            <PlaylistsProvider>{props.children}</PlaylistsProvider>
          </HistoryProvider>
        </LoadingProvider>
      </Router>
    </AuthProvider>
  );
};
export {
  Providers,
  AuthContext,
  PlaylistsContext,
  HistoryContext,
  LoadingContext,
};
