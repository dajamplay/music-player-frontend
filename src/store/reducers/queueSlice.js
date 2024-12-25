import {createSlice} from '@reduxjs/toolkit';
import {
    addTrackToQueueAction,
    clearQueueAction, deleteTrackFromQueueAction,
    loadQueueFromLocalStorageAction, reorderQueueTracks,
} from "@/store/actions/queueActions.js";

const initialState = {
    tracks: [],
    currentTrack: null,
};

export const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reorderQueueTracks.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
        builder.addCase(addTrackToQueueAction.fulfilled, (state, action) => {
            state.tracks.push(action.payload);
        });
        builder.addCase(loadQueueFromLocalStorageAction.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
        builder.addCase(clearQueueAction.fulfilled, (state, action) => {
            state.tracks = [];
        });
        builder.addCase(deleteTrackFromQueueAction.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
    },
});

export default queueSlice.reducer;
