import {useMusicPlayerContext} from "@/music_player/MusicPlayerProvider.jsx";
import {secondsToMinutes} from "@/utils/time.js";
import styles from './Player.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackwardStep,
    faForwardStep,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {Link} from "react-router-dom";
import TrackImage from "@/components/track/TrackImage.jsx";

const Player = () => {

    const {play, prev, next, seekTo, pause, isPlaying, currentTrack, position, musicPlayer} = useMusicPlayerContext();

    const inputHandler = (e) => {
        seekTo(e.target.value);
    }

    const playPause = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.progress_bar_container}>
                <div>{secondsToMinutes(position)}</div>
                <input
                    type={'range'}
                    min={0}
                    max={Math.round(isNaN(musicPlayer.duration) ? 0 : musicPlayer.duration)}
                    onChange={inputHandler}
                    value={Math.round(position)}
                />
                <div>{secondsToMinutes(isNaN(musicPlayer.duration) ? 0 : musicPlayer.duration)}</div>
            </div>
            {Object.keys(currentTrack).length > 0 &&
                <div className={styles.control_container}>
                    <div onClick={playPause}>
                        <TrackImage
                            isPlaying={isPlaying}
                            isActive={true}
                            src={import.meta.env.VITE_APP_BASE_URL + currentTrack.artwork}
                            alt={currentTrack.title}
                        />
                    </div>
                    <div className={styles.control_container_description}>
                        <div className={styles.control_container_description_title}>
                            {currentTrack.title}
                        </div>
                        <div className={styles.control_container_description_artist}>
                            {currentTrack.artist !== currentTrack.title && currentTrack.artist}
                        </div>
                    </div>
                    <div className={styles.control_container_play_pause}>
                        <div>
                            <FontAwesomeIcon className={styles.prev_next_button} icon={faBackwardStep} onClick={prev}/>
                        </div>
                        <div>
                            {isPlaying ?
                                <FontAwesomeIcon className={styles.play_pause_button} icon={faPause} onClick={pause}/>
                                :
                                <FontAwesomeIcon className={styles.play_pause_button} icon={faPlay} onClick={play}/>
                            }
                        </div>
                        <div>
                            <FontAwesomeIcon className={styles.prev_next_button} icon={faForwardStep} onClick={next}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Player;
