import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './features/pasteSlice'
import themeReducer from './features/themeSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
    theme: themeReducer,
  },
})