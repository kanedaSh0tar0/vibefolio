import { configureStore } from '@reduxjs/toolkit'
import modalRducer from './modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalRducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']