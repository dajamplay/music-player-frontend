import styles from "./Track.module.scss";
import gifImg from "@/assets/img/audio-eq.gif";

const TrackImage = ({src, alt, isActive = false, isPlaying = false}) => {
    return(
        <div className={styles.image_container}>
            <img
                src={src}
                alt={alt}
                className={styles.track_image}
            />
            {isActive && isPlaying &&
                <img
                    src={gifImg}
                    alt={alt}
                    className={styles.track_image_eq}
                />
            }
        </div>
    );
}

export default TrackImage;
