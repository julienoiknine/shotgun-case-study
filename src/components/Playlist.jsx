import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext, PlayerContext } from '../App';

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

  console.log('playlist rendered')

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
        {tracks.map((e, i) => <PlaylistTrack
          key={i}
          index={i}
          tracklist={tracks}
        />)}
      </tbody>
    </table>
  );
}

function PlaylistTrack({ index, tracklist }) {

  const playlistTrack = tracklist[index];
  const track = tracklist[index].track;

  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { setPlayerContext } = useContext(PlayerContext);

  const [icon, setIcon] = useState(faHeart);

  useEffect(() => {
    favorites.get(track.id) !== undefined ? setIcon(faHeartSolid) : setIcon(faHeart)
  });

  function toggleFavorite(e) {
    const isFavorite = favorites.get(track.id) !== undefined;
    const newFavorites = new Map(favorites);
    if (isFavorite) {
      setIcon(faHeart);
      newFavorites.delete(track.id);
    } else {
      setIcon(faHeartSolid);
      newFavorites.set(track.id, playlistTrack);
    }
    setFavorites(newFavorites);
  }

  function playSong() {
    console.log(`setting playerContext to ${index}, ${tracklist}`);
    setPlayerContext({ index, tracklist });
  }

  return (
    <tr>
      <td className='Like-cell'><FontAwesomeIcon icon={icon} className="Like-icon" onClick={toggleFavorite} /></td>
      <td><span className='Clickable-span' onClick={playSong}>{track.name}</span></td>
      <td>{track.artists.map((e) => e.name).join(', ')}</td>
      <td>{track.album.name}</td>
      <td>{playlistTrack.added_at}</td>
    </tr>
  );
}

export { PlaylistHeader, Playlist };