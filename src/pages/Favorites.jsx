import { React, useContext } from 'react';
import { PlaylistHeader, Playlist } from '../components/Playlist'
import { FavoritesContext } from '../App';

function Favorites() {

  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <h1>this is the favorites page</h1>
      <PlaylistHeader name="Favorites" coversUrl={[]} nTrack={0} duration={23988768} />
      <Playlist tracks={Array.from(favorites.values())} />
    </>
  );
}

export default Favorites;