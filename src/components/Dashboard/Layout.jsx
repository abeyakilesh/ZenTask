import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
