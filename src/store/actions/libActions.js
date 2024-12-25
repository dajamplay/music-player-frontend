import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "@/axios/axios.js";

export const fetchTracksAction = createAsyncThunk(
    'tracks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get('/tracks');
            let data = response.data;
            data = data.map( (track) => {
                return {
                    ...track,
                    url: track.url,
                    artwork: track.artwork,
                    track_id: track.id,
                };
            });
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка. Попробуйте подключиться позднее.');
        }
    }
);
