import { useState } from 'react';
import { useData } from '../context/DataContext';
import styles from './CalendarPage.module.css';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';

const CalendarPage = () => {
    const { tasks } = useData();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const getTasksForDay = (day) => {
        return tasks.filter(task => {
            if (task.dueDate) {
                return isSameDay(parseISO(task.dueDate), day);
            }
            return false;
        });
    };

    const selectedDayTasks = getTasksForDay(selectedDate);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.monthParams}>
                    <button onClick={prevMonth} className={styles.navBtn}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1>{format(currentMonth, 'MMMM yyyy')}</h1>
                    <button onClick={nextMonth} className={styles.navBtn}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.calendarGrid}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className={styles.weekday}>{day}</div>
                    ))}

                    {calendarDays.map((day, idx) => {
                        const dayTasks = getTasksForDay(day);
                        const isSelected = isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, monthStart);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    styles.dayCell,
                                    !isCurrentMonth && styles.outsideMonth,
                                    isSelected && styles.selectedDay,
                                    isToday && styles.today
                                )}
                                onClick={() => setSelectedDate(day)}
                            >
                                <span className={styles.dayNumber}>{format(day, 'd')}</span>
                                {dayTasks.length > 0 && (
                                    <div className={styles.taskDots}>
                                        {dayTasks.slice(0, 3).map(t => (
                                            <div
                                                key={t.id}
                                                className={clsx(styles.dot, t.completed && styles.dotCompleted)}
                                            />
                                        ))}
                                        {dayTasks.length > 3 && <div className={styles.dotMore}>+</div>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={styles.sidePanel}>
                    <h2>Tasks for {format(selectedDate, 'MMM do')}</h2>
                    <div className={styles.sideTaskList}>
                        {selectedDayTasks.length > 0 ? (
                            selectedDayTasks.map(task => (
                                <div key={task.id} className={styles.miniTask}>
                                    {task.completed ?
                                        <CheckCircle size={16} className={styles.iconCompleted} /> :
                                        <Circle size={16} className={styles.iconIncomplete} />
                                    }
                                    <span className={clsx(task.completed && styles.textCompleted)}>
                                        {task.title}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noTasks}>No tasks due on this day.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
