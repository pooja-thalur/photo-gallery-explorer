import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MainPage from './pages/MainPage';
import PhotoDetails from './components/PhotoDetails';

const PAGE_SIZE = 100;

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact={true} path="/" element={<Home />} />
      <Route path="/gallery" element={<MainPage />} />
      <Route path="/photo/:id" element={<PhotoDetails />} /> {/* ✅ detail route */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;