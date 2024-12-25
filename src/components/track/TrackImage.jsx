import styles from "./Track.module.scss";
import gifImg from "@/assets/img/audio-eq.gif";

const TrackImage = ({src, alt, isActive = false, isPlaying = false}) => {
    return(
        <>
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
        </>
    );
}

export default TrackImage;
