import { gql, useQuery } from '@apollo/client';

import Playlist from '../components/Playlist'

const QUERY = gql`
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

  const { loading, error, data } = useQuery(QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data);

  const playlist = data.playlist;
  const firstTracks = playlist.tracks.slice(0, 20);
  const covers = firstTracks.map((playlistTrack) => (playlistTrack.track.album.images[1].url));

  return (
    <Playlist
      name={playlist.name}
      coversUrl={covers}
      nTrack={playlist.tracks.length}
      duration={23988768}
      tracks={playlist.tracks} />
  );
}

/*
<>
      <PlaylistHeader name={playlist.name} coversUrl={covers} nTrack={playlist.tracks.length} duration={23988768} />
      <Playlist tracks={playlist.tracks} />
    </>
*/

export default Home;
