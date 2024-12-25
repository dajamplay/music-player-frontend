import styles from "./Track.module.scss";

const TrackImage = ({src, alt}) => {
    return(
        <img
            src={src}
            alt={alt}
            className={styles.track_image}
        />
    );
}

export default TrackImage;
