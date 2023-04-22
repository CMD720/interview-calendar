import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useState} from "react";
import moment, {Moment} from "moment/moment";


export interface momentSliceState{
    firstWeekday:moment.Moment,
    lastWeekday:moment.Moment,
}
const initialState  = {
    firstWeekday:moment().startOf('isoWeek'),
    lastWeekday:moment().endOf('isoWeek'),
}

const momentSlice = createSlice({
    name: "moment",
    initialState,
    reducers: {
        currentMoment(state,action){
            // console.log('XB')
            state.firstWeekday = action.payload.firstWeekday;
            state.lastWeekday = action.payload.lastWeekday;
        },
        presentMoment(state){
            state.firstWeekday = moment().startOf('isoWeek');
            state.lastWeekday = moment().endOf('isoWeek');
        },
    }
})
export default momentSlice.reducer
export const {
    currentMoment,
    presentMoment
} = momentSlice.actions