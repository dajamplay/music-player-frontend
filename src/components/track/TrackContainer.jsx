import styles from "./Track.module.scss";

const TrackContainer = ({children, isActive = false, isTargetDrag = false, isDragOver = false}) => {
    return(
        <div
            className={`
                ${styles.track_container}
                ${isActive ? styles.track_container_active : ''}
                ${isDragOver ? styles.track_container_over : ''}
            `}
        >
            {children}
        </div>
    );
}

export default TrackContainer;
