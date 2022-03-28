import './App.css';
import {
  Homepage,
  AuthPage,
  LibraryPage,
  SingleVideoPage,
  Profile,
  Playlists,
  SinglePlaylist,
  History,
  WatchLater,
} from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Loading } from './components';
import { useAuth, useLoading } from './hooks';

function App() {
  const { isAuth } = useAuth();
  const { loading } = useLoading();
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {!isAuth && <Route path="/auth" element={<AuthPage />} />}
        <Route path="/watch" element={<LibraryPage />} />
        <Route path="/watch/:videoId" element={<SingleVideoPage />} />
        {isAuth && <Route path="/profile" element={<Profile />} />}
        {isAuth && <Route path="/playlists" element={<Playlists />} />}
        {isAuth && (
          <Route path="/playlist/:playlistName" element={<SinglePlaylist />} />
        )}
        {isAuth && <Route path="/history" element={<History />} />}
        {isAuth && <Route path="/watch-later" element={<WatchLater />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {loading && <Loading />}
    </div>
  );
}

export default App;
