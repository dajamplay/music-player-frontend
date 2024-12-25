import styles from '../Header.module.scss';
import {Link} from "react-router-dom";

const Logo = () => {
    return(
        <Link to={'/'}>
            <div className={styles.logo}>MP237</div>
        </Link>
    );
};

export default Logo;
