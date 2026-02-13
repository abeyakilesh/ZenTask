import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import styles from './CourseDetailPage.module.css';
import { ChevronLeft, CheckCircle, Circle, PlayCircle, Menu, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useData } from '../context/DataContext';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const course = courses.find(c => c.id === courseId);
    const { getCourseProgress, toggleCourseTopic, isTopicCompleted } = useData();
    const progress = getCourseProgress(courseId);

    // State to track selected topic for reading
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Default to first topic if available
    useEffect(() => {
        if (course && course.modules.length > 0 && course.modules[0].topics.length > 0 && !selectedTopicId) {
            setSelectedTopicId(course.modules[0].topics[0].id);
        }
    }, [course, selectedTopicId]);

    if (!course) {
        return <div className={styles.container}>Course not found</div>;
    }

    // Flatten topics to find the current one easily
    const allTopics = course.modules.flatMap(m => m.topics);
    const currentTopic = allTopics.find(t => t.id === selectedTopicId);
    const isCurrentTopicCompleted = currentTopic ? isTopicCompleted(courseId, currentTopic.id) : false;

    // Navigation logic
    const currentIndex = allTopics.findIndex(t => t.id === selectedTopicId);
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;

    const handleTopicClick = (topicId) => {
        setSelectedTopicId(topicId);
        setMobileMenuOpen(false); // Close menu on mobile after selection
        window.scrollTo(0, 0); // Scroll to top of content
    };

    return (
        <div className={styles.wrapper}>
            {/* Sidebar / Drawer */}
            <aside className={clsx(styles.sidebar, mobileMenuOpen && styles.open)}>
                <div className={styles.sidebarHeader}>
                    <Link to="/courses" className={styles.backLink}>
                        <ChevronLeft size={20} />
                        Back
                    </Link>
                    <h2 className={styles.courseTitle}>{course.title}</h2>
                    <div className={styles.miniProgress}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                    </div>
                    <span className={styles.progressText}>{Math.round(progress)}% Done</span>
                </div>

                <div className={styles.moduleList}>
                    {course.modules.length > 0 ? (
                        course.modules.map(module => (
                            <div key={module.id} className={styles.moduleGroup}>
                                <h3 className={styles.moduleTitle}>{module.title}</h3>
                                <div className={styles.topicList}>
                                    {module.topics.map(topic => {
                                        const isCompleted = isTopicCompleted(courseId, topic.id);
                                        const isActive = selectedTopicId === topic.id;

                                        return (
                                            <button
                                                key={topic.id}
                                                className={clsx(
                                                    styles.topicItem,
                                                    isActive && styles.activeTopic
                                                )}
                                                onClick={() => handleTopicClick(topic.id)}
                                            >
                                                <div className={styles.iconWrapper}>
                                                    {isCompleted ?
                                                        <CheckCircle size={16} className={styles.completedIcon} /> :
                                                        <div className={styles.circlePlaceholder} />
                                                    }
                                                </div>
                                                <span className={clsx(isCompleted && styles.completedText)}>
                                                    {topic.title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptySidebar}>No modules yet</div>
                    )}
                </div>
            </aside>

            {/* Mobile Header Toggle */}
            <div className={styles.mobileHeader}>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={styles.menuBtn}>
                    <Menu size={24} />
                </button>
                <span className={styles.mobileTitle}>{course.title}</span>
            </div>

            {/* Main Content Area */}
            <main className={styles.contentArea}>
                {currentTopic ? (
                    <div className={styles.contentContainer}>
                        <div className={styles.contentHeader}>
                            <h1>{currentTopic.title}</h1>
                            <button
                                className={clsx(styles.markBtn, isCurrentTopicCompleted && styles.markedBtn)}
                                onClick={() => toggleCourseTopic(courseId, currentTopic.id)}
                            >
                                {isCurrentTopicCompleted ? (
                                    <>
                                        <CheckCircle size={20} /> Completed
                                    </>
                                ) : (
                                    <>
                                        <Circle size={20} /> Mark as Complete
                                    </>
                                )}
                            </button>
                        </div>

                        <div className={styles.contentBody}>
                            {currentTopic.content ? (
                                <div className={styles.markdownContent}>
                                    {/* Simple rendering for now. In real app, use ReactMarkdown */}
                                    {currentTopic.content.split('\n').map((line, idx) => {
                                        if (line.trim().startsWith('###')) return <h3 key={idx}>{line.replace('###', '')}</h3>;
                                        if (line.trim().startsWith('####')) return <h4 key={idx}>{line.replace('####', '')}</h4>;
                                        if (line.trim().startsWith('*')) return <li key={idx}>{line.replace('*', '')}</li>;
                                        if (line.trim().match(/^\d+\./)) return <div key={idx} className={styles.numberedItem}>{line}</div>;
                                        return <p key={idx}>{line}</p>;
                                    })}
                                </div>
                            ) : (
                                <div className={styles.placeholderContent}>
                                    <PlayCircle size={48} />
                                    <p>Select a topic to start reading content.</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.navigationFooter}>
                            {prevTopic && (
                                <button
                                    className={styles.navBtn}
                                    onClick={() => handleTopicClick(prevTopic.id)}
                                >
                                    <ChevronLeft size={20} /> Previous: {prevTopic.title}
                                </button>
                            )}
                            <div className={styles.spacer} />
                            {nextTopic && (
                                <button
                                    className={clsx(styles.navBtn, styles.nextBtn)}
                                    onClick={() => handleTopicClick(nextTopic.id)}
                                >
                                    Next: {nextTopic.title} <ChevronRight size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <PlayCircle size={64} />
                        <h2>Welcome to the Course!</h2>
                        <p>Select a topic from the sidebar to begin learning.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CourseDetailPage;
