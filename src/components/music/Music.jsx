import { useEffect, useState, useRef } from "react";
import audioSource1 from "../../assets/you-can-be-king-again.mp3";
import audioSource2 from "../../assets/mr-raindrops.mp3";
import audioSource3 from "../../assets/wind-naruto-op.mp3";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectMusic, setSelectMusic] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [hover, setHover] = useState(false);
  const audioSelection = [
    useRef(new Audio(audioSource1)),
    useRef(new Audio(audioSource2)),
    useRef(new Audio(audioSource3)),
  ];
  const buttonStyling = {
    background: "none",
    border: "none",
    color: "var(--white)",
    fontSize: "2rem",
    cursor: "pointer",
  };

  const rangeStyling = {
    transform: "rotate(-90deg)",
    width: "50px",
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioSelection[selectMusic].current.pause();
      audioSelection[selectMusic].current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioSelection[selectMusic].current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioSelection[selectMusic].current.volume = newVolume;
  };

  const handleWheelScroll = (e) => {
    // Adjust volume based on scroll direction
    const delta = Math.sign(e.deltaY);
    const step = 0.05; // Adjust the step size as needed

    handleVolumeChange(Math.max(0, Math.min(1, volume - step * delta)));
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  useEffect(() => {
    if (hover == true) {
      // Add event listener for wheel scroll
      window.addEventListener("wheel", handleWheelScroll);

      // Clean up event listener when the component is unmounted
      return () => {
        window.removeEventListener("wheel", handleWheelScroll);
      };
    }
  }, [hover, volume]);

  return (
    <>
      {audioSelection.map((audio, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              if (selectMusic !== index) {
                audioSelection[selectMusic].current.pause();
                audioSelection[selectMusic].current.currentTime = 0;
                setSelectMusic(index);
                setIsPlaying(true);
                audioSelection[index].current.play();
              }
            }}
            style={buttonStyling}
          >
            {`{𝄞 ${index}}`}
          </button>
        );
      })}

      <button onClick={togglePlayPause} style={buttonStyling}>
        {isPlaying ? <>◼</> : <>▶</>}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={volume}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={() => handleWheelScroll}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        style={rangeStyling}
      />
    </>
  );
};

export default Music;
