import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { PlayerContext } from '../App';
import { isEmpty, getMinutes } from '../utils/utils';
import '../css/Player.css';
import { fieldNameFromStoreName } from '@apollo/client/cache';

const audio = new Audio();

function Player() {

  const [audioPaused, setAudioPaused] = useState(audio.paused);
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(0);
  const [track, setTrack] = useState(undefined);

  const { playerContext: pc, setPlayerContext } = useContext(PlayerContext);

  //console.log(`rendering player, track: ${track}`);

  useEffect(() => {
    console.log("usueehj")
    if (!pc.tracklist[pc.index]) return;
    const newTrack = pc.tracklist[pc.index].track;
    setTrack(newTrack);
    console.log(`changing audio url to ${newTrack.preview_url}`);
    audio.src = newTrack.preview_url;
    safePlay();
    setAudioPaused(audio.paused);
    setProgress(0);
    audio.onloadedmetadata = () => {
      setMax(audio.duration);
    };
    audio.onended = () => {
      setAudioPaused(true);
    }
  }, [pc]);

  useEffect(() => {
    setInterval(() => {
      setProgress(audio.currentTime);
    }, 200);
  });

  function togglePlay() {
    console.log(`play/pause ${track.name}`);
    audio.paused ? audio.play() : audio.pause();
    setAudioPaused(audio.paused);
  }

  function onNext() {
    const index = (pc.index + 1) % pc.tracklist.length;
    setPlayerContext({ index, tracklist: pc.tracklist });
  }

  function onPrevious() {
    const index = (pc.index - 1) % pc.tracklist.length;
    setPlayerContext({ index, tracklist: pc.tracklist });
  }

  function getFooterClass() {
    return track ? "Footer Active" : "Footer";
  }

  async function safePlay() {
    const promise = audio.play();
    if (promise !== undefined) {
      promise.then(() => { }).catch((e) => {
        console.log('error playing track, switching to next');
        onNext();
      })
    }
  }

  function onRangeChange(e) {
    audio.currentTime = e.target.value;
  }

  return (
    <div className={getFooterClass()}>
      <div className='Range-cont'>
        <input
          type="range"
          max={max}
          value={progress}
          onChange={onRangeChange}
          style={{ ...{ backgroundSize: `${(progress) * 100 / max}% 100%` } }}>
        </input>
      </div>
      <div className='Player-cont'>
        <div className='Noise'></div>
        <div className='Overlay'></div>
        {track ? <img className='Player-img' src={track.album.images[0].url} alt="" /> : null}
        <div className='Row-flex'>
          <FontAwesomeIcon icon={faBackwardStep} onClick={onPrevious} />
          <FontAwesomeIcon icon={audioPaused ? faPlay : faPause} onClick={togglePlay} className="Player-icon" />
          <FontAwesomeIcon icon={faForwardStep} onClick={onNext} />
        </div>
        <div className='Row-flex'>
          <span className='Time-cont'>{getMinutes(progress)}</span>
          <span> / </span>
          <span className='Time-cont'>{getMinutes(max)}</span>
        </div>
        {track ?
          <span className='Ellipsis'>{`${track.name} - ${track.artists.map((e) => e.name).join(', ')}`}</span>
          : null}
      </div>
    </div>
  );
}

export default Player;