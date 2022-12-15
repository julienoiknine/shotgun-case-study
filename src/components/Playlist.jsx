import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../App';

function CoversGrid({ coversUrl }) {
  return (
    <div className='Covers-grid'>
      {[...Array(4)].map((e, i) => {
        return <img className="Default-image" key={i} src={coversUrl[i]} />
      })}
    </div>
  );
}

function PlaylistMetadata({ name, nTrack, duration }) {
  return (
    <div className='Playlist-metadata'>
      <p>PLAYLIST</p>
      <h1>{name}</h1>
      <p>{nTrack} songs, {new Date(duration).toISOString().slice(11, 19)}</p>
    </div>
  );
}

function PlaylistHeader({ coversUrl, name, nTrack, duration }) {
  return (
    <div className='Playlist-header'>
      <CoversGrid coversUrl={coversUrl} />
      <PlaylistMetadata name={name} nTrack={nTrack} duration={duration} />
    </div>
  );
}

function Playlist({ tracks }) {
  return (
    <table style={{ width: '100%' }}>
      <colgroup>
        <col span="1" style={{ width: '10%' }} />
        <col span="1" style={{ width: '30%' }} />
        <col span="1" style={{ width: '20%' }} />
        <col span="1" style={{ width: '25%' }} />
        <col span="1" style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th></th>
          <th>TITLE</th>
          <th>ARTIST</th>
          <th>ALBUM</th>
          <th><FontAwesomeIcon icon={faCalendarPlus} /></th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((e, i) => <PlaylistTrack key={i} playlistTrack={e} />)}
      </tbody>
    </table>
  );
}

function PlaylistTrack({ playlistTrack }) {

  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [icon, setIcon] = useState(faHeart);

  useEffect(() => {
    favorites.get(playlistTrack.track.id) !== undefined ? setIcon(faHeartSolid) : setIcon(faHeart)
  });

  function toggleFavorite(e) {
    const isFavorite = favorites.get(playlistTrack.track.id) !== undefined;
    const newFavorites = new Map(favorites);
    if (isFavorite) {
      setIcon(faHeart);
      newFavorites.delete(playlistTrack.track.id);
    } else {
      setIcon(faHeartSolid);
      newFavorites.set(playlistTrack.track.id, playlistTrack);
    }
    setFavorites(newFavorites);
  }

  function playSong() {
    console.log(`playing song ${playlistTrack.track.name}`);
  }

  return (
    <tr>
      <td className='Like-cell'><FontAwesomeIcon icon={icon} className="Like-icon" onClick={toggleFavorite} /></td>
      <td><span className='Clickable-span' onClick={playSong}>{playlistTrack.track.name}</span></td>
      <td>{playlistTrack.track.artists.map((e) => e.name).join(', ')}</td>
      <td>{playlistTrack.track.album.name}</td>
      <td>{playlistTrack.added_at}</td>
    </tr>
  );
}

export { PlaylistHeader, Playlist };