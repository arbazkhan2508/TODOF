import { configureStore } from '@reduxjs/toolkit'
import studentReducers from '@/store/Reducers/studentReducers'

export const store = configureStore({
  reducer: {
     studentReducers,
  },
})