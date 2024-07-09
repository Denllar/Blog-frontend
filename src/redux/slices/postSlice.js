import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fecthPosts = createAsyncThunk('posts/fetchPosts', async (value) => {
    try {
        const {data} = await axios.post('/posts', value)
        return data
    } catch (err) {
        console.error(err);
    }
})

export const fecthTags = createAsyncThunk('posts/fetchTags', async () => {
    try {
        const {data} = await axios.get('/tags')
        return data
    } catch (err) {
        console.error(err);
    }
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`)
        return data
    } catch (err) {
        console.error(err);
    }
})


const initialState = {
    posts: {
        items: [],
        status: '',
    },
    tags: {
        items: [],
        status: '',
    }
}

const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fecthPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fecthPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded'
            state.posts.items = action.payload
        },
        [fecthPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
        [fetchRemovePost.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },

        [fecthTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fecthTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded'
            state.tags.items = action.payload
        },
        [fecthTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
    }
})


export const {  } = postSlice.actions;
export default postSlice.reducer;