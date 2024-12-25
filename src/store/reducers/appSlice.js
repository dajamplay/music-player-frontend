import {createSlice} from '@reduxjs/toolkit';
import {updateServerState} from "@/store/actions/appActions.js";

const initialState = {
    menuIsOpen: false,
    serverOnline: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleMenu(state) {
            state.menuIsOpen = !state.menuIsOpen;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateServerState.fulfilled, (state, action) => {
            state.serverOnline = action.payload;
        });
    },
});

export const { toggleMenu } = appSlice.actions
export default appSlice.reducer;
