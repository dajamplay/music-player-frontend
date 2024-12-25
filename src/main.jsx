import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./router/router.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import './assets/css/app.scss';
import {Provider} from 'react-redux';
import {store} from "@/store/store.js";
import {MusicPlayerProvider} from "@/music_player/MusicPlayerProvider.jsx";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
        <MusicPlayerProvider>
            <ContextProvider>
                <RouterProvider router={router}/>
            </ContextProvider>
        </MusicPlayerProvider>
    </Provider>,
  // </StrictMode>
)
