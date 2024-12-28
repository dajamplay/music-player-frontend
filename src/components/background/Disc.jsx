import styles from './Disc.module.scss';
import {useMusicPlayerContext} from "@/music_player/MusicPlayerProvider.jsx";
import discImg from '@/assets/img/disc.png';

const Disc = () => {
    const {isPlaying, currentTrack} = useMusicPlayerContext();

    return(
        <div className={styles.container}
             style={{
                 backgroundImage: "url(" + import.meta.env.VITE_APP_BASE_URL + currentTrack.artwork + ")",
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 opacity: 0.3,
            }}
        >
            <img
                src={discImg}
                alt=""
                className={isPlaying && styles.rotating}
            />
        </div>
    );
}

export default Disc;
