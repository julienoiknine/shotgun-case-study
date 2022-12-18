import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Player from './components/Player';

export const FavoritesContext = React.createContext({
  /** @type {Map<String, Object>} */
  favorites: new Map(),
  setFavorites: (favorites) => { }
});

/**
 * Context for the music player. Contains an array of tracks and the index of 
 * the current track
 */
export const PlayerContext = React.createContext({
  /** @type {Object} */
  playerContext: { index: 0, tracklist: [] },
  setPlayerContext: (playerContext) => { }
});

function App() {

  const [favorites, setFavorites] = useState(new Map());
  const [playerContext, setPlayerContext] = useState({ index: 0, tracklist: [] });

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <PlayerContext.Provider value={{ playerContext, setPlayerContext }}>
        <BrowserRouter>
          <div className='Background' />
          <Navbar style={{ position: 'absolute' }} />
          <Routes>
            <Route index element={<Home />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
          <Player style={{ position: 'absolute' }} />
        </BrowserRouter>
      </PlayerContext.Provider>
    </FavoritesContext.Provider>
  );
}

export default App;