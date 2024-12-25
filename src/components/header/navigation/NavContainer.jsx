import NavItem from "./NavItem.jsx";
import {useStateContext} from "@/contexts/ContextProvider.jsx";
import LogoutItem from "@/components/header/navigation/LogoutItem.jsx";
import styles from './Nav.module.scss';

const NavContainer = () => {
    const {user, token} = useStateContext();

    if (user && token) {
        return(
            <div className={styles.nav_container}>
                <div className={styles.nav_user_item}>{user.email}</div>
                <LogoutItem/>
            </div>
        );
    }

    return(
        <div>
            <NavItem linkTo='/login' title='Вход'/>
            <NavItem linkTo='/signup' title='Регистрация'/>
        </div>
    );
}

export default NavContainer;
