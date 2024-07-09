import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fecthAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    try {
        const { data } = await axios.post('/auth/login', params)
        return data
    } catch (err) {
        console.error(err);
    }
})

export const fecthAuthMe = createAsyncThunk('auth/fetchUserDataMe', async () => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (err) {
        console.error(err);
    }
})

export const fecthRegister = createAsyncThunk('auth/fetchUserDataRegister', async (param) => {
    try {
        const { data } = await axios.post('/auth/register', param)
        return data
    } catch (err) {
        console.error(err);
    }
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setLogout(state) {
            state.data = null
        }
    },
    extraReducers: {
        [fecthAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fecthAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fecthAuth.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        [fecthAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fecthAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fecthAuthMe.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },

        [fecthRegister.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fecthRegister.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        },
        [fecthRegister.rejected]: (state) => {
            state.data = null
            state.status = 'error'
        },
    }
})

export const { setLogout } = authSlice.actions
export default authSlice.reducer;