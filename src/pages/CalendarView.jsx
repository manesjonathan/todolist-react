import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [dateState, setDateState] = useState(new Date())
    const changeDate = (e) => {
        setDateState(e)
    }
    return (
        <div className={'flex mt-28 items-center justify-center w-full'}>
            <Calendar
                value={dateState}
                onChange={changeDate}
            />
        </div>
    )
}
export default CalendarView
