import './App.css';
import {
  Homepage,
  AuthPage,
  LibraryPage,
  SingleVideoPage,
  Playlists,
  SinglePlaylist,
  History,
  WatchLater,
  LikedVideos,
} from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Loading, Toast } from './components';
import { useAuth, useLoading, useToast } from './hooks';

function App() {
  const { isAuth } = useAuth();
  const { loading } = useLoading();
  const { toast } = useToast();
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {!isAuth && <Route path="/auth" element={<AuthPage />} />}
        <Route path="/watch" element={<LibraryPage />} />
        <Route path="/watch/:videoId" element={<SingleVideoPage />} />

        {isAuth && <Route path="/playlists" element={<Playlists />} />}
        {isAuth && (
          <Route path="/playlist/:playlistName" element={<SinglePlaylist />} />
        )}
        {isAuth && <Route path="/history" element={<History />} />}
        {isAuth && <Route path="/watch-later" element={<WatchLater />} />}
        {isAuth && <Route path="/liked-videos" element={<LikedVideos />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {loading && <Loading />}
      {toast.status && <Toast />}
    </div>
  );
}

export default App;
