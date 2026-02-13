import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (login(email, password)) {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access your workspace</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Mail className={styles.icon} size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Lock className={styles.icon} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
