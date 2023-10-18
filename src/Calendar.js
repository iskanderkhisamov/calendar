import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Calendar = () => {
    const currentDate = new Date(); // Получить текущую дату
    const navigate = useNavigate();
    let location = useLocation();// Получить доступ к объекту истории

    // При клике на конкретную дату, установить выбранную дату
    const handleDateClick = (day) => {
        navigate(`/notes/${year}/${month}/${day.toISOString().split('T')[0]}`);
    };

    // Получить текущий месяц и год
    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());

    useEffect(() => {
        console.log(location);
        setYear(Number(location?.state?.year) || currentDate.getFullYear());
        setMonth(Number(location?.state?.month) || currentDate.getMonth());
    }, [location]);

    // Получить первый день месяца и последний день месяца
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const [hoveredDay, setHoveredDay] = useState(null);

    // Сгенерировать массив дней в месяце
    const daysInMonth = [];

    // Добавить соответствующее количество пустых элементов в начало массива
    for(let i = 0; i < (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1); i++) {
        daysInMonth.push(null);
    }

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        daysInMonth.push(new Date(day));
    }

    while(daysInMonth.length % 7 !== 0){
        daysInMonth.push(null);
    }

    // Функция для обработки кнопки следующего месяца
    const handleNextMonth = () => {
        setMonth((prevMonth) => (prevMonth + 1) % 12);
        setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
    };

    // Функция для обработки кнопки предыдущего месяца
    const handlePrevMonth = () => {
        setMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
        setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
    };

    const getNote = (date) => {
        const correctDate = new Date(new Date(date).setDate(date.getDate() + 1));
        const notes = JSON.parse(localStorage.getItem('notes')) || {};
        return notes[correctDate.toISOString().split('T')[0]];
    }

    const hasNote = (date) => Boolean(getNote(date));

    const getNoteTitle = (date) => {
        if (date && hoveredDay
            && date.getDate() === hoveredDay.getDate()
            && date.getMonth() === hoveredDay.getMonth()
            && date.getFullYear() === hoveredDay.getFullYear())
        {
            return getNote(date)?.title || date.getDate();
        }

        return date ? date.getDate() : '';
    }

    const handleMouseOver = (day) => {
        setHoveredDay(day);
    };

    const handleMouseOut = () => {
        setHoveredDay(null);
    };

    return (
        <div>
            <div>
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>{`${month + 1}/${year}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th className="equal-width">Понедельник</th>
                    <th className="equal-width">Вторник</th>
                    <th className="equal-width">Среда</th>
                    <th className="equal-width">Четверг</th>
                    <th className="equal-width">Пятница</th>
                    <th className="equal-width">Суббота</th>
                    <th className="equal-width">Воскресенье</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: Math.ceil(daysInMonth.length / 7) }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({ length: 7 }).map((_, colIndex) => {
                            const dayIndex = rowIndex * 7 + colIndex;
                            const day = daysInMonth[dayIndex];
                            return (
                                <td key={colIndex}
                                    className={day && hasNote(day) ? 'has-note' : ''}
                                    onClick={day ? () => handleDateClick(new Date(day.setDate(day.getDate() + 1))) : undefined}
                                    onMouseOver={() => handleMouseOver(day)}
                                    onMouseOut={handleMouseOut}>
                                    {getNoteTitle(day)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
