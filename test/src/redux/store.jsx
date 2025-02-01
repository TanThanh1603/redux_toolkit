import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlices.jsx'
import  userSlice  from './slices/userSlices.jsx'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user : userSlice
  },
})