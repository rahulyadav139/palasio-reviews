import './App.css';
import { Homepage, AuthPage } from './pages';
import { Routes, Route } from 'react-router-dom';
import { VideoCard } from './components';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/test" element={<VideoCard />} />
      </Routes>
    </div>
  );
}

export default App;
