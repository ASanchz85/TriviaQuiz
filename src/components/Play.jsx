import play from "../sounds/play.mp3";
import playButton from "../assets/play-button-overlay-5.png";

const Play = ({ setIsPlaying }) => {
  const playNewGame = () => {
    const startingAudio = new Audio(play);
    startingAudio.volume = 0.5;
    startingAudio.play();
    setIsPlaying(true);
  };

  return (
    <div
      className="playButton"
      onClick={() => {
        playNewGame();
      }}
    >
      <h2>Start new game</h2>
      <img
        src={playButton}
        style={{ height: "80px", width: "80px" }}
        alt="play button"
      />
    </div>
  );
};

export default Play;
