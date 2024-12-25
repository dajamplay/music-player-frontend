import styles from './Footer.module.scss';
import Player from "@/components/player/Player.jsx";

const Footer = () => {
    return(
        <div className={styles.container}>
            <Player />
        </div>
    );
}

export default Footer;
