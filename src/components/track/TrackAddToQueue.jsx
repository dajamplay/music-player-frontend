import styles from "./Track.module.scss";

const TrackAddToQueue = ({onClick}) => {
    return(
        <div
            className={styles.add_track_to_queue}
            onClick={onClick}
        >Добавить</div>
    );
}

export default TrackAddToQueue;
