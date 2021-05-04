import React from "react";
import styles from "../styles/Video.module.scss";

function VideoBox(props) {
  // console.log(props);

  return (
    <div className={styles.videoPanel}>
      <video
        width="100%"
        height="100%"
        download={false}
        poster="https://doableyo.com/cdn/files/mangoes-video-ad-poster.png"
        controls
        autoPlay={props.autoPlay}
      >
        <source
          src="https://doableyo.com/cdn/files/mangoes-video-ad.mp4"
          type="video/mp4"
        />
        <source
          src="https://doableyo.com/cdn/files/mangoes-video-ad.ogg"
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBox;
