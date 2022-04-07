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
} from './pages';
import { Routes, Route } from 'react-router-dom';
import { VideoCard } from './components';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test" element={<VideoCard />} />
        <Route path="/watch" element={<LibraryPage />} />
        <Route path="/watch/:videoId" element={<SingleVideoPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:playlistName" element={<SinglePlaylist />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
