import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { CheckCircle, Clock } from 'lucide-react';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
    const { user } = useAuth();
    const { getDailyProgress, getWeeklyProgress } = useData();

    const dailyProgress = getDailyProgress();
    const weeklyData = getWeeklyProgress();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p>Here's your productivity overview.</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <h3>Daily Goals</h3>
                        <CheckCircle className={styles.iconSuccess} size={24} />
                    </div>
                    <div className={styles.statValue}>
                        <span className={styles.bigNumber}>{dailyProgress.completed}</span>
                        <span className={styles.total}>/ {dailyProgress.total}</span>
                    </div>
                    <div className={styles.progressBarBg}>
                        <div
                            className={styles.progressBarFill}
                            style={{ width: `${dailyProgress.percentage}%` }}
                        />
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <h3>Pending Tasks</h3>
                        <Clock className={styles.iconWarning} size={24} />
                    </div>
                    <div className={styles.statValue}>
                        <span className={styles.bigNumber}>
                            {dailyProgress.total - dailyProgress.completed}
                        </span>
                    </div>
                    <p className={styles.statLabel}>Remaining for today</p>
                </div>
            </div>

            <div className={styles.chartSection}>
                <h2>Productivity Analytics</h2>
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#94a3b8' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px'
                                }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="potential"
                                name="Total Potential"
                                stroke="#4ade80"
                                strokeWidth={2}
                                dot={{ fill: '#4ade80', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="actual"
                                name="Actual Performance"
                                stroke="#38bdf8"
                                strokeWidth={3}
                                dot={{ fill: '#38bdf8', r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
