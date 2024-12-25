import axiosClient from "@/axios/axios.js";
import {useStateContext} from "@/contexts/ContextProvider.jsx";
import styles from './Nav.module.scss';
import {useNavigate} from "react-router-dom";

const LogoutItem = () => {

    const {setUser, setToken} = useStateContext();
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();

        axiosClient.post('/logout').then( () => {
            setToken(null);
            setUser({});
            navigate('/login');
        }).catch( err => {
            console.log(err);
        });
    }

    return(
        <>
            <form onSubmit={logoutHandler}>
                <button className={styles.btn_logout}>Выход</button>
            </form>
        </>
    );
};

export default LogoutItem;
