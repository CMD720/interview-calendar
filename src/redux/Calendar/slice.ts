import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TMeetingsWeek {
    year: string,
    month: string,
    weekNumber: number,
    dataMeetings: number[]
}

export interface CalendarSliceState {
    viewMeeting: boolean,
    activeMeetings: number[],
    currentMeeting: number,
    meetingsWeek: TMeetingsWeek[],
}

const initialState: CalendarSliceState = {
    viewMeeting: false,
    activeMeetings: [],
    currentMeeting: 0,
    meetingsWeek: [],
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
            console.log(typeof (action.payload));
            state.activeMeetings = state.activeMeetings.filter(item => item !== action.payload)
        },

        addMeetingsWeek(state, action) {
            const findMeetWeek = state.meetingsWeek.find(item => {
                return ((item.year === action.payload.year) &&
                    (item.weekNumber === action.payload.weekNumber))
            });
            findMeetWeek ? findMeetWeek.dataMeetings = action.payload.dataMeetings : state.meetingsWeek.push(action.payload);
        },

        clearActiveMeetings(state) {
            state.activeMeetings = []
        },

        updActiveMeeting(state, action: PayloadAction<TMeetingsWeek>) {
            const findMeetWeek = state.meetingsWeek.find(item => {
                return ((item.year === action.payload.year) &&
                    (item.weekNumber === action.payload.weekNumber))
            });
            if (findMeetWeek) {
                state.activeMeetings = findMeetWeek.dataMeetings
            }
        },
    }
})

export default calendarSlice.reducer
export const {
    findMeeting,
    setActiveMeetings,
    setCurrentMeeting,
    deleteMeeting,
    addMeetingsWeek,
    clearActiveMeetings,
    updActiveMeeting
} = calendarSlice.actions

