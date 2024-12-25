import {createAsyncThunk} from '@reduxjs/toolkit';
import * as localStorageQueue from "@/utils/localStorageQueue.js";

export const loadQueueFromLocalStorageAction = createAsyncThunk(
    'queue/loadQueueFromLocalStorageAction',
    async (_, thunkAPI) => {
        try {
            return localStorageQueue.getQueue();
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const addTrackToQueueAction = createAsyncThunk(
    'queue/addTrack',
    async (track, thunkAPI) => {
        try {
            await localStorageQueue.addTrackQueue(track);
            return track;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const deleteTrackFromQueueAction = createAsyncThunk(
    'queue/deleteTrackFromQueueAction',
    async (trackId, thunkAPI) => {
        try {
            await localStorageQueue.deleteTrackFromQueue(trackId);

            const state = await thunkAPI.getState();
            let queue = [...state.queue.tracks];

            queue = queue.filter( (track) => {
                return track.queue_id !== trackId;
            });

            return queue;

        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const clearQueueAction = createAsyncThunk(
    'queue/clearQueueAction',
    async (_, thunkAPI) => {
        try {
            await localStorageQueue.clearQueue();
            return [];
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const reorderQueueTracks = createAsyncThunk(
    'queue/reorderQueueTracks',
    async (args, thunkAPI) => {
        const state = await thunkAPI.getState();
        const queue = [...state.queue.tracks];
        try {
            const removed = queue.splice(args.currentIndex, 1);
            queue.splice(args.dropIndex, 0, removed[0]);
            localStorageQueue.setQueue(queue);
            return queue;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);
