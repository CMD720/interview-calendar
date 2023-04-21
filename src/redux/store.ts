import {combineReducers, configureStore} from "@reduxjs/toolkit";
import calendarSlice from './Calendar/slice'

const rootReducer = combineReducers({
    calendar: calendarSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']