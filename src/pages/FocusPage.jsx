import { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Coffee, Briefcase } from 'lucide-react';
import styles from './FocusPage.module.css';
import { format } from 'date-fns';

const FocusPage = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound or notify
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = mode === 'work'
        ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
        : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Focus Mode</h1>
                <p>Stay in the zone.</p>
            </header>

            <div className={styles.timerCard}>
                <div className={styles.modeSwitcher}>
                    <button
                        className={`${styles.modeBtn} ${mode === 'work' ? styles.activeMode : ''}`}
                        onClick={() => switchMode('work')}
                    >
                        <Briefcase size={18} />
                        Work (25m)
                    </button>
                    <button
                        className={`${styles.modeBtn} ${mode === 'break' ? styles.activeMode : ''}`}
                        onClick={() => switchMode('break')}
                    >
                        <Coffee size={18} />
                        Break (5m)
                    </button>
                </div>

                <div className={styles.timerDisplay}>
                    <svg className={styles.progressRing} width="300" height="300">
                        <circle
                            className={styles.progressRingCircleBg}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            fill="transparent"
                            r="120"
                            cx="150"
                            cy="150"
                        />
                        <circle
                            className={styles.progressRingCircle}
                            stroke={mode === 'work' ? '#38bdf8' : '#4ade80'}
                            strokeWidth="12"
                            fill="transparent"
                            r="120"
                            cx="150"
                            cy="150"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 120}`,
                                strokeDashoffset: `${2 * Math.PI * 120 * (1 - progress / 100)}`
                            }}
                        />
                    </svg>
                    <div className={styles.timeText}>{formatTime(timeLeft)}</div>
                </div>

                <div className={styles.controls}>
                    <button onClick={toggleTimer} className={styles.controlBtnMain}>
                        {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                    </button>
                    <button onClick={resetTimer} className={styles.controlBtnSecondary}>
                        <RefreshCw size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FocusPage;
