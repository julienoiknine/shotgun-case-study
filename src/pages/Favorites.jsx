import { React, useContext } from 'react';
import Playlist from '../components/Playlist'
import { FavoritesContext } from '../App';

function Favorites() {

  const { favorites } = useContext(FavoritesContext);

  return (
    <Playlist
      name="Favorites"
      coversUrl={[]}
      nTrack={0}
      duration={23988768}
      tracks={Array.from(favorites.values())} />
  );
}


export default Favorites;