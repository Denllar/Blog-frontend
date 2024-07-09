import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fecthComment = createAsyncThunk('posts/fetchComment', async (value) => {
    try {
        const {data} = await axios.post('/posts', value)
        return data
    } catch (err) {
        console.error(err);
    }
})

export const fetchRemoveComment = createAsyncThunk('posts/fetchRemoveComment', async (id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`)
        return data
    } catch (err) {
        console.error(err);
    }
})


const initialState = {
    comment: {
        items: [],
        status: '',
    }
}

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [fecthComment.pending]: (state) => {
            state.comment.items = []
            state.comment.status = 'loading'
        },
        [fecthComment.fulfilled]: (state, action) => {
            state.comment.status = 'loaded'
            state.comment.items = action.payload
        },
        [fecthComment.rejected]: (state) => {
            state.comment.items = []
            state.comment.status = 'error'
        },

        [fetchRemoveComment.pending]: (state, action) => {
            state.comment.items = state.comment.items.filter(obj => obj._id !== action.meta.arg)
        },
        [fetchRemoveComment.rejected]: (state) => {
            state.comment.items = []
            state.comment.status = 'error'
        },
    }
})


export const {  } = commentSlice.actions;
export default commentSlice.reducer;