import styles from "./Track.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const TrackQueueSettingsModal = ({showModal, setShowModal, deleteTrackFromQueue}) => {
    const onClickHandle = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    return(
        <>
            {showModal && <div onClick={onClickHandle} className={styles.track_queue_settings_modal}>
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={deleteTrackFromQueue}
                    className={styles.track_queue_settings_modal_delete}
                />
            </div>}
        </>
    );
}

export default TrackQueueSettingsModal;
