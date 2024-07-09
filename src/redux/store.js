import { configureStore } from '@reduxjs/toolkit'
import postSlice from "./slices/postSlice"
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    postSlice,
    authSlice,
  }
})
