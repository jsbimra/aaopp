import React from "react";
import styles from "../styles/Loader.module.scss";

function Loader(props) {
  if (!props.show) return null;
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <p className="text-secondary">{props.message || ""}</p>
      </div>
    </div>
  );
}

export default Loader;
