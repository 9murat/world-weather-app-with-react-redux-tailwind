import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeatherData = createAsyncThunk(
    'weather/getWeatherData', async (city ) => {
        const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc488aea67a1f67241875506a55086a6&units=metric`)
        
        return response.data;
    }
)

const initialState = {
    curentCity: 'istanbul',
    weatherData: {},
    loading: false,
    error: null,
}
const weatherSLice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCurentCity: (state, action) => {
            state.curentCity = action.payload;
        },
        // getWeatherDataSuccess: (state, action) => {
        //     state.loading = false;
        //     state.weatherData = action.payload;
        // },
        getWeatherDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        getWeatherDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWeatherData.fulfilled, (state, action) => {
            state.weatherData = action.payload
        })
    },

})

export const { setCurentCity, getWeatherDataFailure, getWeatherDataStart, } = weatherSLice.actions;
export default weatherSLice.reducer;


