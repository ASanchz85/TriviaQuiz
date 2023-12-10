import { useState, useRef } from "react";
import playButton from "../assets/play-button-overlay-5.png";

const Audio = ({ props, questionNumber }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.volume = 1.5;
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6f0c0c",
      }}
    >
      <audio ref={audioRef} src={`${props[questionNumber - 1].id}.mp3`} />
      <p style={{ color: "#fff", textAlign: "center" }}>
        This is an audio question. You won't have time limit, so you can
        reproduce the audio as many times as you want
      </p>
        <button
          onClick={togglePlay}
          style={{
            width: '100%',
            height: "80px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#0e0124",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            gap: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        {!isPlaying && (
          <img
            src={playButton}
            style={{ height: "40px", width: "40px" }}
            alt="play button"
          />
        )}
        </button>
    </div>
  );
};

export default Audio;
