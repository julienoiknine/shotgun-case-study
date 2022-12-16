import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext, PlayerContext } from '../App';
import BlurContainer from './BlurContainer';
import '../css/Playlist.css';
import { convertMsToHM } from '../utils/utils';

function CoversGrid({ coversUrl }) {
  return (
    <div className='Covers-grid'>
      {[...Array(20)].map((e, i) => {
        // return <img className="Default-image" key={i} src={coversUrl[i]} />
        return <BlurContainer src={coversUrl[i]} blur={0.0001 + 0.1 * (Math.floor((i) / 3))} />
      })}
    </div>
  );
}

function PlaylistMetadata({ name, nTrack, duration }) {

  const { hours, minutes } = convertMsToHM(duration);

  return (
    <div className='Playlist-metadata'>
      <p>PLAYLIST</p>
      <h1>{name}</h1>
      <p>{nTrack} songs, {`${hours} hr ${minutes} min`}</p>
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

function PlaylistContent({ tracks }) {

  console.log('playlist rendered')

  return (
    <table style={{ width: '100%' }}>
      <colgroup>
        <col span="1" style={{ minWidth: '20px' }} />
        <col span="1" style={{ minWidth: '220px' }} />
        <col span="1" style={{ minWidth: '150px' }} />
        <col span="1" style={{ minWidth: '190px' }} />
        <col span="1" style={{ minWidth: '80px' }} />
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
      <td>{playlistTrack.added_at.split('T')[0]}</td>
    </tr>
  );
}

function Playlist({ coversUrl, name, tracks }) {

  const nTrack = tracks.length;
  let duration = 0;
  tracks.map(playlistTrack => duration += playlistTrack.track.duration_ms);

  return (
    <div className='Playlist'>
      <PlaylistHeader name={name} coversUrl={coversUrl} nTrack={nTrack} duration={duration} />
      <PlaylistContent tracks={tracks} />
    </div>
  )

}

export default Playlist;