import {createSlice} from "@reduxjs/toolkit";

export interface TMeetingsWeek{
    year: number,
    month: number,
    weekNumber: number,
    dataMeetings:number[]
}
export interface CalendarSliceState {
    viewMeeting: boolean,
    activeMeetings: number[],
    currentMeeting: number,
    MeetingsWeek:TMeetingsWeek[],
}

const initialState: CalendarSliceState = {
    viewMeeting: false,
    activeMeetings: [],
    currentMeeting: 0,
    MeetingsWeek:[],
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        findMeeting(state, action) {
            state.viewMeeting = action.payload
        },
        setActiveMeetings(state, action) {
            state.activeMeetings.push(action.payload)
        },
        setCurrentMeeting(state, action) {
            state.currentMeeting = action.payload
        },
        deleteMeeting(state, action) {
            console.log(typeof(action.payload));
            state.activeMeetings = state.activeMeetings.filter(item => item !== action.payload)

            // activeMeetings.filter(item => item !== i))
        }
    }
})

export default calendarSlice.reducer
export const {findMeeting, setActiveMeetings, setCurrentMeeting, deleteMeeting} = calendarSlice.actions