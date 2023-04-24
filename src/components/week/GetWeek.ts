import moment, {Moment} from "moment/moment";

type getWeekProps = {
    firstWeekday: any;
    lastWeekday: any;
}
// export const getWeek = ({firstWeekday, lastWeekday}: getWeekProps) => {
// //TODO некорректно работает стык месяца на неделе первый день больше последнего
//     const week = []
//     const firstWeekDay = firstWeekday.date();
//     const lastWeekDay = lastWeekday.date();
//     for (let i = firstWeekDay; i <= lastWeekDay; i++) {
//         week.push(i)
//     }
//     return week
// }

export const getWeek = ({firstWeekday, lastWeekday}:getWeekProps) => {
    const firstWeekdayClone = firstWeekday.clone()
    const lastWeekdayClone = lastWeekday.clone()
    const firstWeekDay = firstWeekdayClone.date();
    const lastWeekDay = lastWeekdayClone.date();

    const firstWD = firstWeekdayClone.date();
    const date = firstWeekdayClone.endOf('month');
    const lastDate = date.date();
    const firstMonthday = lastWeekdayClone.startOf('month').day();
    // console.log('первый день недели -',firstWD,' дней в месяце -', lastDate,' первый день недели месяца - ', firstMonthday);

    const weekDays = [];
    if(firstWeekday.date() > lastWeekday.date()){
        for (let i = firstWD; i <= lastDate; i++) {
            weekDays.push(i)
        }
        for(let j = 1 ; j<=(8 - firstMonthday); j++){
            weekDays.push(j)
        }
    }else{
        for(let i = firstWeekDay; i<=lastWeekDay; i++){
            weekDays.push(i)
        }
    }
return weekDays
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
    const presentWeek = moment().isoWeek()
    return {month, year, today, currentWeek, presentWeek}
}