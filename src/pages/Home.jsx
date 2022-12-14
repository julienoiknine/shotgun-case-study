import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons'

const QUERY = gql`
  query GetPlaylist {
    playlist {
      name
      tracks {
        added_at
        track {
          name
          preview_url
          album {
            name
            images {
              url
            }
          }
          artists {
            name
          }
        }
      }
    }
  }
`;

function CoversGrid({ coversUrl }) {
  return (
    <div className='Covers-grid'>
      {coversUrl.map((e, i) => <img key={i} src={e} />)}
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
  return (
    <tr>
      <td><FontAwesomeIcon icon={faHeart} className="Like-icon" /></td>
      <td>{playlistTrack.track.name}</td>
      <td>{playlistTrack.track.artists.map((e) => e.name).join(', ')}</td>
      <td>{playlistTrack.track.album.name}</td>
      <td>{playlistTrack.added_at}</td>
    </tr>
  );
}

function Home() {

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data);

  const playlist = data.playlist;
  const firstTracks = playlist.tracks.slice(0, 4);
  const covers = firstTracks.map((playlistTrack) => (playlistTrack.track.album.images[1].url));

  return (
    <>
      <PlaylistHeader name={playlist.name} coversUrl={covers} nTrack={playlist.tracks.length} duration={23988768} />
      <Playlist tracks={playlist.tracks} />
    </>
  );
}

export default Home;
