import { IconButton } from "@mui/material";

import styles from "./styles.module.scss";
import { Radio } from "@mui/icons-material";

import ReactAudioPlayer from "react-audio-player";

const Station = (station) => {
  const handleChange = () => {};
  //   console.log(station.name);

  return (
    <div className={styles.song_container}>
      <div className={styles.left}>
        <IconButton onClick={handleChange} className={styles.play_btn}>
          {/* <PauseIcon /> */}
          <Radio />
        </IconButton>
        {/* <img src={Radio} alt="radio_img" /> */}
        <p>Votos: {station.station.votes}</p>
      </div>
      <div className={styles.left}>
        <p>{station.station.name}</p>
      </div>
      <ReactAudioPlayer src={station.station.urlResolved} controls />
      {/* </Link> */}
    </div>
  );
};

export default Station;
