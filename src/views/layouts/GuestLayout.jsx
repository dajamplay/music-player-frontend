import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import Header from "../../components/header/Header.jsx";

const GuestLayout = () => {
    const {token} = useStateContext();

    if (token) {
        return <Navigate to='/'/>
    }

    return(
        <div className='default_container'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default GuestLayout;
