import { gql, useQuery } from '@apollo/client';

import Playlist from '../components/Playlist'

const PLAYLIST_QUERY = gql`
  query GetPlaylist {
    playlist {
      name
      tracks {
        added_at
        track {
          id
          name
          preview_url
          duration_ms
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

function Home() {

  const { loading, error, data } = useQuery(PLAYLIST_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const playlist = data.playlist;
  const firstTracks = playlist.tracks.slice(0, 20);
  // We use the medium sized image for the playlist's covers grid
  const covers = firstTracks.map((playlistTrack) => (playlistTrack.track.album.images[1].url));

  document.title = `Shotgun - ${playlist.name}`;

  return (
    <Playlist
      name={playlist.name}
      coversUrl={covers}
      tracks={playlist.tracks} />
  );
}

export default Home;
