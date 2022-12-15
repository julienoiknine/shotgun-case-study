import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Player from './components/Player';

export const FavoritesContext = React.createContext({
  favorites: new Map(),
  setFavorites: (favorites) => { }
});

export const PlayedTrackContext = React.createContext({
  playedTrack: {},
  setPlayedTrack: (playedTrack) => { }
});

function App() {

  const [favorites, setFavorites] = useState(new Map());
  const [playedTrack, setPlayedTrack] = useState({});

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <PlayedTrackContext.Provider value={{ playedTrack, setPlayedTrack }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
          <Player />
        </BrowserRouter>
      </PlayedTrackContext.Provider>
    </FavoritesContext.Provider>
  );
}

export default App;