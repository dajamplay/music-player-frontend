import styles from "./Track.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

const TrackPlayPauseButton = ({isPlaying, isActive}) => {
    return (
        <>
            {isPlaying && isActive ?
                <div>
                    <FontAwesomeIcon className={styles.play_pause_button} icon={faPause}/>
                </div>
                :
                <div>
                    <FontAwesomeIcon className={styles.play_pause_button} icon={faPlay}/>
                </div>
            }
        </>
    );
}

export default TrackPlayPauseButton;
