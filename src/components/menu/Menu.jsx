import {Link} from "react-router-dom";
import styles from './Menu.module.scss';
import {useStateContext} from "@/contexts/ContextProvider.jsx";
import {appSlice, toggleMenu} from "@/store/reducers/appSlice.js";
import {useDispatch, useSelector} from "react-redux";

const Menu = () => {

    const {user} = useStateContext();

    const {menuIsOpen} = useSelector(state => state.app);
    const {toggleMenu} = appSlice.actions;
    const dispatch = useDispatch();

    const closeButtonHandler = (e) => {
        dispatch(toggleMenu());
    }

    if (menuIsOpen) return(
        <div className={styles.container} onClick={closeButtonHandler}>
            <div className={styles.menu_header}>
                {/*<div className={styles.menu_header_title}>Menu</div>*/}
            </div>
            <div className={styles.menu_body}>
                <Link to={'/queue'} className={styles.menu_item}>Проигрыватель</Link>
                <Link to={'/tracks'} className={styles.menu_item}>Библиотека</Link>
                {user?.is_admin === "1" && <Link to={'/admin'} className={styles.menu_item}>Admin</Link>}
            </div>
            <div className={styles.menu_footer}>
                {/*footer*/}
            </div>
        </div>
    );
}

export default Menu;
