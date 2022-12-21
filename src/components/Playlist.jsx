import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from 'react';
import { FavoritesContext, PlayerContext } from '../App';
import BlurContainer from './BlurContainer';
import '../css/Playlist.css';
import { convertMsToHM } from '../utils/utils';


/**
 * A 2x20 grid composed of the 20 first (or less is the playlist is smaller) 
 * album covers of the playlist.
 * @param {Object} props 
 * @param {Array.<string>} props.coversUrl the urls of the album covers
 * @returns 
 */
function CoversGrid({ coversUrl }) {
  return (
    <div className='Covers-grid'>
      {[...Array(20)].map((e, i) => {
        // The more to the right a column of cover is, the more blurry it gets
        return <BlurContainer key={i} src={coversUrl[i]} blur={0.0001 + 0.1 * (Math.floor((i) / 3))} />
      })}
    </div>
  );
}


/**
 * Component displaying the playlist's metadata, such as its name, duration...
 * @param {Object} props 
 * @param {string} props.name the playlist's name
 * @param {number} props.nTrack number of tracks in the playlist
 * @param {duration} props.duration duration of the playlist
 * @returns 
 */
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


/**
 * Playlist's header component.
 * @param {Object} props 
 * @param {Array.<string>} props.coversUrl the urls of the album covers
 * @param {string} props.name the playlist's name
 * @param {number} props.nTrack number of tracks in the playlist
 * @param {duration} props.duration duration of the playlist
 * @returns 
 */
function PlaylistHeader({ coversUrl, name, nTrack, duration }) {
  return (
    <div className='Playlist-header'>
      <CoversGrid coversUrl={coversUrl} />
      <PlaylistMetadata name={name} nTrack={nTrack} duration={duration} />
    </div>
  );
}


/**
 * A single track component. 
 * @param {Object} props 
 * @param {number} props.index the index of the track in the tracklist array
 * @param {Array.<Object>} props.tracklist an array containing the playlist's tracks
 * @returns 
 */
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


/**
 * Placeholder track component with loading animation.
 * @returns 
 */
function LoadingPlaylistTrack() {

  return (
    <tr>
      <td
        className='Empty-row Loading'
        style={{ ...{ animationDelay: (Math.random()) + 's' } }}
        colSpan={5}>
      </td>
    </tr>

  );
}


/**
 * Table component containing the playlist's tracks. 
 * @param {Object} props
 * @param {boolean} loading is the content still loading? 
 * @param {Array.<Object>} props.tracks an array containing the playlist's tracks
 * @returns 
 */
function PlaylistContent({ loading, tracks }) {

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
        {loading ?
          [...Array(5)].map((e, i) => <LoadingPlaylistTrack key={i} />)
          :
          tracks.map((e, i) => <PlaylistTrack
            key={i}
            index={i}
            tracklist={tracks} />)
        }
      </tbody>
    </table>
  );
}


/**
 * Playlist component. Composed of a header displaying the playlist's metadata
 * and a table containing the playlist's tracks.
 * @param {Object} props 
 * @param {Array.<string>} props.coversUrl the urls of the album covers
 * @param {string} props.name the playlist's name
 * @param {Array.<Object>} props.tracks the tracks 
 * @returns 
 */
function Playlist({ coversUrl, name, tracks }) {

  const nTrack = tracks.length;
  let duration = 0;
  tracks.map(playlistTrack => duration += playlistTrack.track.duration_ms);

  return (
    <div className='Centered-cont'>
      <div className='Playlist'>
        <PlaylistHeader name={name} coversUrl={coversUrl} nTrack={nTrack} duration={duration} />
        <PlaylistContent tracks={tracks} />
      </div>
    </div>
  )

}

/**
 * Placeholder container with loading animations.
 * @returns 
 */
function LoadingPlaylist() {
  return (
    <div className='Centered-cont'>
      <div className='Playlist'>
        <div className='Playlist-header Loading'></div>
        <PlaylistContent loading={true} tracks={[]} />
      </div>
    </div>
  )
}


export { Playlist, LoadingPlaylist };