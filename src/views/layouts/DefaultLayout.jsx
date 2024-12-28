import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import axiosClient from "../../axios/axios.js";
import {useEffect} from "react";
import Header from "../../components/header/Header.jsx";
import Menu from "@/components/menu/Menu.jsx";
import styles from './DefaultLayout.module.scss';
import {useDispatch, useSelector} from "react-redux";
import * as libActions from '@/store/actions/LibActions';
import Footer from "@/components/footer/Footer.jsx";
import Disc from "@/components/background/Disc.jsx";

const DefaultLayout = ({children}) => {
    const {setUser, token} = useStateContext();
    const dispatch = useDispatch();

    if (!token) {
        return <Navigate to='/login'/>
    }

    useEffect( () => {
        dispatch(libActions.fetchTracksAction());
        axiosClient.get('/user').then( ({data}) => {
            setUser(data);
        });
    }, [])

    return (
        <div className={styles.container}>
            <Menu/>
            <div className={styles.header_wrapper}>
                <Header/>
            </div>
            <div className={styles.content_wrapper}>
                <Outlet/>
            </div>
            <div className={styles.footer_wrapper}>
                <Footer/>
            </div>
            <Disc/>
        </div>
    );
}

export default DefaultLayout;
