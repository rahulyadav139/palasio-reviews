import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth-context';
import { PlaylistsContext, PlaylistsProvider } from './use-playlists';
import { HistoryContext, HistoryProvider } from './use-history';
import { LoadingContext, LoadingProvider } from './use-loading';
import { LikedVideosContext, LikedVideosProvider } from './use-liked-videos';
import { ToastContext, ToastProvider } from './use-toast';

const Providers = props => {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider>
          <LoadingProvider>
            <LikedVideosProvider>
              <HistoryProvider>
                <PlaylistsProvider>{props.children}</PlaylistsProvider>
              </HistoryProvider>
            </LikedVideosProvider>
          </LoadingProvider>
        </ToastProvider>
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
  LikedVideosContext,
  ToastContext,
};
