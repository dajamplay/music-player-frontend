import styles from "./Track.module.scss";

const TrackTitle = ({title, artist}) => {
    const getTitle = () => {
        if (title === artist) return title;
        return artist + ' - ' + title;
    }

    return(
        <div className={styles.track_title}>{getTitle()}</div>
    );
}

export default TrackTitle;
