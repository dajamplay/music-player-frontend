import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "@/axios/axios.js";

export const updateServerState = createAsyncThunk(
    'app/updateServerState',
    async (_, thunkAPI) => {
        try {
            const response = await axiosClient.get('/up');
            return true;
        } catch (e) {
            return thunkAPI.fulfillWithValue(false);
        }
    }
);
