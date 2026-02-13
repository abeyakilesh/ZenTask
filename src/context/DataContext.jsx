import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, isSameDay, parseISO } from 'date-fns';
import { courses } from '../data/courses';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data from local storage on mount
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        const storedNotes = localStorage.getItem('notes');

        if (storedTasks) setTasks(JSON.parse(storedTasks));
        if (storedNotes) setNotes(JSON.parse(storedNotes));

        setLoading(false);
    }, []);

    // Save data whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }, [tasks, notes, loading]);

    // Task Operations
    const addTask = (title, category = 'General', priority = 'Medium', dueDate = null) => {
        const newTask = {
            id: uuidv4(),
            title,
            completed: false,
            progress: 0, // 0-100
            priority, // Low, Medium, High
            createdAt: new Date().toISOString(),
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            completedAt: null,
            category
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const isCompleted = !task.completed;
                return {
                    ...task,
                    completed: isCompleted,
                    progress: isCompleted ? 100 : 0, // Auto-set progress
                    completedAt: isCompleted ? new Date().toISOString() : null
                };
            }
            return task;
        }));
    };

    const updateTaskProgress = (id, progress) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const isCompleted = progress === 100;
                return {
                    ...task,
                    progress,
                    completed: isCompleted,
                    completedAt: isCompleted ? new Date().toISOString() : (task.completed ? null : task.completedAt)
                };
            }
            return task;
        }));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const getDailyProgress = () => {
        const today = new Date();
        const tasksToday = tasks.filter(task => {
            // If task is completed, check if completed today
            if (task.completed && task.completedAt) {
                return isSameDay(parseISO(task.completedAt), today);
            }
            // If created today (and not completed or completed today)
            return isSameDay(parseISO(task.createdAt), today);
        });

        const completedToday = tasksToday.filter(t => t.completed).length;
        return {
            total: tasksToday.length,
            completed: completedToday,
            percentage: tasksToday.length > 0 ? (completedToday / tasksToday.length) * 100 : 0
        };
    };

    const getWeeklyProgress = () => {
        const days = [];
        const today = new Date();

        // Generate last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }

        return days.map(day => {
            const dateStr = format(day, 'EEE');

            const tasksForDay = tasks.filter(task => {
                // Simplification: tasks created on or before this day and not completed before this day
                // Ideally, we'd track daily snapshots, but for now we'll approximate:
                // Tasks modified/completed on this day OR created on this day
                const createdDate = parseISO(task.createdAt);
                return isSameDay(createdDate, day) ||
                    (task.completedAt && isSameDay(parseISO(task.completedAt), day));
            });

            const totalPotential = tasksForDay.length * 100;
            const actualProgress = tasksForDay.reduce((acc, task) => acc + (task.progress || 0), 0);

            return {
                name: dateStr,
                potential: totalPotential || 100, // Default to 100 range if no tasks
                actual: actualProgress
            };
        });
    };

    const reorderTasks = (newTasks) => {
        setTasks(newTasks);
    };

    // Note Operations
    const addNote = (title, content) => {
        const newNote = {
            id: uuidv4(),
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setNotes(prev => [newNote, ...prev]);
    };

    const updateNote = (id, title, content) => {
        setNotes(prev => prev.map(note =>
            note.id === id
                ? { ...note, title, content, updatedAt: new Date().toISOString() }
                : note
        ));
    };

    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    // Course Operations
    // Structure: { courseId: [topicId1, topicId2, ...] }
    const [courseProgress, setCourseProgress] = useState({});

    useEffect(() => {
        const storedProgress = localStorage.getItem('courseProgress');
        if (storedProgress) setCourseProgress(JSON.parse(storedProgress));
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
        }
    }, [courseProgress, loading]);

    const toggleCourseTopic = (courseId, topicId) => {
        setCourseProgress(prev => {
            const currentCourseProgress = prev[courseId] || [];
            const isCompleted = currentCourseProgress.includes(topicId);

            let newCourseProgress;
            if (isCompleted) {
                newCourseProgress = currentCourseProgress.filter(id => id !== topicId);
            } else {
                newCourseProgress = [...currentCourseProgress, topicId];
            }

            return {
                ...prev,
                [courseId]: newCourseProgress
            };
        });
    };

    const getCourseProgress = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;

        const totalTopics = course.modules.reduce((acc, module) => acc + module.topics.length, 0);
        if (totalTopics === 0) return 0;

        const completedCount = (courseProgress[courseId] || []).length;
        return (completedCount / totalTopics) * 100;
    };

    // Helper to check if a specific topic is done
    const isTopicCompleted = (courseId, topicId) => {
        return (courseProgress[courseId] || []).includes(topicId);
    };

    const value = {
        tasks,
        addTask,
        toggleTask,
        updateTaskProgress,
        reorderTasks,
        deleteTask,
        getDailyProgress,
        getWeeklyProgress,
        notes,
        addNote,
        updateNote,
        deleteNote,
        getCourseProgress,
        toggleCourseTopic,
        isTopicCompleted
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
