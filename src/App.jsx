import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Dashboard/Layout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';
import FocusPage from './pages/FocusPage';
import CalendarPage from './pages/CalendarPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/focus" element={<FocusPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
