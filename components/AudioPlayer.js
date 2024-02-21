// components/AudioPlayer.js
import { useAudio } from '../contexts/AudioContext';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = () => {
  const { audioSrc, isPlaying, stopAudio } = useAudio();

  return (
    <ReactAudioPlayer
      src={audioSrc}
      autoPlay={isPlaying}
      controls={false}  // Set controls to false
      onPause={stopAudio}
      onEnded={stopAudio}
    />
  );
};

export default AudioPlayer;
