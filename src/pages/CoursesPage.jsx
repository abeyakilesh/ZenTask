import { Link } from 'react-router-dom';
import styles from './CoursesPage.module.css';
import { BookOpen, Code, Server, Database, Globe, Layers, Cpu, Shield, Terminal } from 'lucide-react';
import { courses } from '../data/courses';

const getIcon = (id) => {
    switch (id) {
        case 'os': return <Cpu size={32} color="#60a5fa" />;
        case 'net': return <Globe size={32} color="#34d399" />;
        case 'dbms': return <Database size={32} color="#fcd34d" />;
        case 'mysql': return <Database size={32} color="#f87171" />;
        case 'sys-design': return <Layers size={32} color="#a78bfa" />;
        case 'mern': return <Code size={32} color="#2dd4bf" />;
        case 'java-100': return <Terminal size={32} color="#fb923c" />;
        default: return <BookOpen size={32} color="#94a3b8" />;
    }
};

const CoursesPage = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Learning Center</h1>
                <p>Master 12 core domains of software engineering.</p>
            </header>

            <div className={styles.grid}>
                {courses.map(course => (
                    <Link key={course.id} to={`/courses/${course.id}`} className={styles.card}>
                        <div className={styles.iconWrapper}>
                            {getIcon(course.id)}
                        </div>
                        <div className={styles.content}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <span className={styles.badge}>{course.level}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
