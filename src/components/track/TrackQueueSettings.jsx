import styles from "./Track.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const TrackQueueSettings = ({onClick}) => {
    return(
        <>
            <FontAwesomeIcon
                icon={faGear}
                className={styles.track_queue_settings}
                onClick={onClick}
            />
        </>
    );
}

export default TrackQueueSettings;
