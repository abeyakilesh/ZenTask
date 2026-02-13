import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Flag, Tag, Calendar as CalendarIcon } from 'lucide-react';
import styles from './TasksPage.module.css';
import { format } from 'date-fns';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableTaskItem } from './SortableTaskItem';
import confetti from 'canvas-confetti';

const TasksPage = () => {
    const { tasks, addTask, toggleTask, updateTaskProgress, deleteTask, reorderTasks } = useData();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');
    const [dueDate, setDueDate] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Check for all completed
    useEffect(() => {
        if (tasks.length > 0 && tasks.every(t => t.completed)) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, category, priority, dueDate);
            setNewTaskTitle('');
            setPriority('Medium');
            setCategory('General');
            setDueDate('');
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);
            reorderTasks(arrayMove(tasks, oldIndex, newIndex));
        }
    };

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return styles.priorityHigh;
            case 'Medium': return styles.priorityMedium;
            case 'Low': return styles.priorityLow;
            default: return styles.priorityMedium;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Daily Tasks</h1>
                <div className={styles.date}>{format(new Date(), 'EEEE, MMMM do')}</div>
            </header>

            <form onSubmit={handleAddTask} className={styles.inputForm}>
                <div className={styles.mainInputGroup}>
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.addButton}>
                        <Plus size={20} />
                    </button>
                </div>

                <div className={styles.optionsGroup}>
                    <div className={styles.selectWrapper}>
                        <CalendarIcon size={16} />
                        <input
                            type="date"
                            className={styles.dateInput}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.selectWrapper}>
                        <Flag size={16} />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={styles.select}
                        >
                            <option value="High">High Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="Low">Low Priority</option>
                        </select>
                    </div>

                    <div className={styles.selectWrapper}>
                        <Tag size={16} />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="General">General</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Learning">Learning</option>
                        </select>
                    </div>
                </div>
            </form>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tasks}
                    strategy={verticalListSortingStrategy}
                >
                    <div className={styles.taskList}>
                        {tasks.map(task => (
                            <SortableTaskItem
                                key={task.id}
                                task={task}
                                toggleTask={toggleTask}
                                updateTaskProgress={updateTaskProgress}
                                deleteTask={deleteTask}
                                getPriorityColor={getPriorityColor}
                            />
                        ))}

                        {tasks.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No tasks yet. Add one to get started!</p>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default TasksPage;
