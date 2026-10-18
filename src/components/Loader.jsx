import PropTypes from "prop-types";
import styles from "../styles/Loader.module.css";

export default function Loader({ className }) {
  return (
    <div
      className={
        styles.loader +
        " " +
        (className === "loaderHidden" ? styles.loaderHidden : "")
      }
    >
      <h1 className={styles.loaderText}>CAMPEON</h1>
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};