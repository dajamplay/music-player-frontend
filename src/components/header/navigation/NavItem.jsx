import {Link} from "react-router-dom";
import styles from './Nav.module.scss';

const NavItem = ({linkTo, title}) => {
    return(
        <>
            <Link to={linkTo} className={styles.item}>{title}</Link>
        </>
    );
}

export default NavItem;
