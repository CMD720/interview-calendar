import moment, {Moment} from "moment/moment";

type getWeekProps = {
    firstWeekday: any;
    lastWeekday: any;
}
export const getWeek = ({firstWeekday, lastWeekday}: getWeekProps) => {
//TODO некорректно работает стык месяца на неделе первый день больше последнего
//количество дней в месяце
    const week = []
    const firstWeekDay = firstWeekday.date();
    const lastWeekDay = lastWeekday.date();
    for (let i = firstWeekDay; i <= lastWeekDay; i++) {
        week.push(i)
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