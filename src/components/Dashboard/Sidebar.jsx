import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, StickyNote, LogOut, Clock, Calendar as CalendarIcon, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: StickyNote, label: 'Notes', path: '/notes' },
        { icon: Clock, label: 'Focus', path: '/focus' },
        { icon: CalendarIcon, label: 'Calendar', path: '/calendar' },
        { icon: BookOpen, label: 'Courses', path: '/courses' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>ZenTask</h2>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${styles.navItem} ${isActive ? styles.active : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className={styles.footer}>
                <button onClick={logout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
