import { React, useContext } from 'react';
import Playlist from '../components/Playlist'
import { FavoritesContext } from '../App';

function Favorites() {

  const { favorites } = useContext(FavoritesContext);

  const firstTracks = Array.from(favorites.values()).slice(0, 20);
  const covers = firstTracks.map((playlistTrack) => (playlistTrack.track.album.images[1].url));

  return (
    <Playlist
      name="Favorites"
      coversUrl={covers}
      tracks={Array.from(favorites.values())} />
  );
}


export default Favorites;