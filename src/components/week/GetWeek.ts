import moment, {Moment} from "moment/moment";
import {useState} from "react";


type getWeekProps = {
    firstWeekday: any;
    lastWeekday: any;
}
// const [week, setWeek] = useState<number[]>([])
// export const getWeek = () => {
export const getWeek = ({firstWeekday, lastWeekday}: getWeekProps) => {

    const week = []
    const firstWeekDay = firstWeekday.date();
    const lastWeekDay = lastWeekday.date();
    for (let i = firstWeekDay; i <= lastWeekDay; i++) {
        week.push(i)
        // setWeek(prevState => ([...prevState, i]))
    }


    return week
}

export const getWeekDays = () => {
    const days = moment.weekdaysMin()
    const temp = days.splice(0, 1)[0]
    days.splice(days.length, 1, temp)
    return days
}

type getMonthYearprops = {
    firstWeekday: Moment
}
export const getMonthYear = ({firstWeekday}:getMonthYearprops) => {
    const month = firstWeekday.format('MMMM')
    const year = firstWeekday.format('YYYY')
    const today = Number(moment().format('DD'))
    const currentWeek = firstWeekday.week()
    const presentWeek = moment().week()
    return {month, year, today, currentWeek, presentWeek}
}

export const getMoment = (firstDay:Moment , lastDay:Moment) => {
    // const [firstWeekday, setFirstWeekday] = useState<Moment>(moment().startOf('isoWeek'))
    // const [lastWeekday, setLastWeekday] = useState<Moment>(moment().endOf('isoWeek'))


}
