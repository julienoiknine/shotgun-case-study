import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForwardStep, faBackwardStep } from '@fortawesome/free-solid-svg-icons'
import { PlayedTrackContext } from '../App';
import { isEmpty, getMinutes } from '../utils/utils';
import '../css/Player.css';

const audio = new Audio();

function Player() {

  const [audioPaused, setAudioPaused] = useState(audio.paused);
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(0);

  const { playedTrack: track } = useContext(PlayedTrackContext);

  useEffect(() => {
    console.log(`changing audio url to ${track.preview_url}`);
    audio.src = track.preview_url;
    setAudioPaused(true);
    setProgress(0);
    audio.onloadedmetadata = () => {
      setMax(audio.duration);
    };
    audio.onended = () => {
      setAudioPaused(true);
    }
  }, [track]);

  useEffect(() => {
    setInterval(() => {
      setProgress(audio.currentTime);
    }, 100);
  });

  function togglePlay() {
    console.log(`play/pause ${track.name}`);
    audio.paused ? audio.play() : audio.pause();
    setAudioPaused(audio.paused);
  }

  function getFooterClass() {
    return isEmpty(track) ? "Footer" : "Footer Active";
  }

  return (
    <div className={getFooterClass()}>
      {isEmpty(track) ? null : <img className='Player-img' src={track.album.images[0].url} alt="" />}
      <div className='Controls-cont'>
        <FontAwesomeIcon icon={faBackwardStep} className="Player-icon" />
        <FontAwesomeIcon icon={audioPaused ? faPlay : faPause} onClick={togglePlay} className="Player-icon" />
        <FontAwesomeIcon icon={faForwardStep} className="Player-icon" />
      </div>
      <span className='Time-cont'>{getMinutes(progress)}</span>
      <span> / </span>
      <span className='Time-cont'>{getMinutes(max)}</span>
      <input type="range" max={max} value={progress}></input>
    </div>
  );
}

export default Player;