import Logo from "./logo/Logo.jsx";
import NavContainer from "./navigation/NavContainer.jsx";
import styles from './Header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "@/store/reducers/appSlice.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const {toggleMenu} = appSlice.actions;
    const dispatch = useDispatch();

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    return(
        <div className={styles.container}>
            <div onClick={toggleMenuHandler}>
                <FontAwesomeIcon className={styles.menu_button} icon={faBars}/>
            </div>
            <Logo/>
            <NavContainer/>
        </div>
    );
};

export default Header;
