import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Check, Trash2, Calendar as CalendarIcon, GripVertical } from 'lucide-react';
import styles from './TasksPage.module.css';
import { format } from 'date-fns';
import clsx from 'clsx';

export const SortableTaskItem = ({ task, toggleTask, updateTaskProgress, deleteTask, getPriorityColor }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={clsx(styles.taskItem, task.completed && styles.completed)}>
            <div className={styles.taskMain}>
                <div {...attributes} {...listeners} className={styles.dragHandle}>
                    <GripVertical size={20} />
                </div>

                <button
                    onClick={() => toggleTask(task.id)}
                    className={styles.checkbox}
                >
                    {task.completed && <Check size={14} strokeWidth={3} />}
                </button>

                <div className={styles.taskContent}>
                    <div className={styles.titleRow}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={clsx(styles.badge, getPriorityColor(task.priority))}>
                            {task.priority}
                        </span>
                        <span className={styles.badge}>{task.category}</span>
                    </div>
                    <span className={styles.taskDate}>
                        <CalendarIcon size={12} />
                        {task.dueDate ? `Due: ${format(new Date(task.dueDate), 'MMM do')}` : format(new Date(task.createdAt), 'h:mm a')}
                    </span>
                </div>

                <button
                    onClick={() => deleteTask(task.id)}
                    className={styles.deleteButton}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className={styles.progressSection}>
                <div className={styles.sliderContainer}>
                    <span className={styles.progressLabel}>{Math.round(task.progress || 0)}%</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress || 0}
                        onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))}
                        className={styles.slider}
                        style={{
                            '--progress': `${task.progress || 0}%`,
                            '--color': task.progress === 100 ? '#4ade80' :
                                task.progress > 50 ? '#facc15' : '#f87171'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
