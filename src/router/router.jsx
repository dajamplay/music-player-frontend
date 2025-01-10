import {createBrowserRouter, Navigate} from "react-router-dom";
import Signup from "../views/auth/Signup.jsx";
import NotFound from "../views/NotFound.jsx";
import Login from "../views/auth/Login.jsx";
import DefaultLayout from "../views/layouts/DefaultLayout.jsx";
import GuestLayout from "../views/layouts/GuestLayout.jsx";
import Tracks from "@/views/library/Tracks.jsx";
import Admin from "@/views/admin/Admin.jsx";
import Queue from "@/views/queue/Queue.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/queue'/>,
            },
            {
                path: '/queue',
                element: <Queue/>,
            },
            {
                path: '/tracks',
                element: <Tracks/>,
            },
            {
                path: '/admin',
                element: <Admin/>,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <Signup/>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]);

export default router;
