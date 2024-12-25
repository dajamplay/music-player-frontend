import {configureStore} from '@reduxjs/toolkit';
import libReducer from './reducers/libSlice';
import appReducer from './reducers/appSlice';
import queueReducer from './reducers/queueSlice';

export const store = configureStore({
    reducer: {
        lib: libReducer,
        app: appReducer,
        queue: queueReducer,
    },
});
