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
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { useAuth } from './hooks';

function App() {
  const { isAuth } = useAuth();
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
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
