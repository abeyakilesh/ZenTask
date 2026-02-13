import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import styles from './NotesPage.module.css';

const NotesPage = () => {
    const { notes, addNote, deleteNote } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleAddNote = (e) => {
        e.preventDefault();
        if (newTitle.trim() || newContent.trim()) {
            addNote(newTitle || 'Untitled Note', newContent);
            setNewTitle('');
            setNewContent('');
            setIsAdding(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>My Notes</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={styles.addButton}
                >
                    <Plus size={20} />
                    <span>New Note</span>
                </button>
            </header>

            {isAdding && (
                <div className={styles.addNoteForm}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className={styles.titleInput}
                    />
                    <textarea
                        placeholder="Type your note here..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className={styles.contentInput}
                        rows={4}
                    />
                    <div className={styles.formActions}>
                        <button onClick={() => setIsAdding(false)} className={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button onClick={handleAddNote} className={styles.saveBtn}>
                            Save Note
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.notesGrid}>
                {notes.map(note => (
                    <div key={note.id} className={styles.noteCard}>
                        <div className={styles.noteHeader}>
                            <h3>{note.title}</h3>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className={styles.deleteBtn}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className={styles.noteContent}>{note.content}</p>
                        <div className={styles.noteFooter}>
                            {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}

                {notes.length === 0 && !isAdding && (
                    <div className={styles.emptyState}>
                        <StickyNote size={48} />
                        <p>No notes yet. Create one to organize your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesPage;
