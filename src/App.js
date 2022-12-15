import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';

export const FavoritesContext = React.createContext({
  favorites: new Map(),
  setFavorites: (favorites) => { }
});

function App() {

  const [favorites, setFavorites] = useState(new Map());

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </FavoritesContext.Provider>
  );
}

export default App;