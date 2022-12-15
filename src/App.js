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

export const PlayerContext = React.createContext({
  playerContext: { index: 0, tracklist: [] },
  setPlayerContext: (playerContext) => { }
});

function App() {

  console.log('app rendered')

  const [favorites, setFavorites] = useState(new Map());
  const [playerContext, setPlayerContext] = useState({ index: 0, tracklist: [] });

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <PlayerContext.Provider value={{ playerContext, setPlayerContext }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
          <Player />
        </BrowserRouter>
      </PlayerContext.Provider>
    </FavoritesContext.Provider>
  );
}

export default App;