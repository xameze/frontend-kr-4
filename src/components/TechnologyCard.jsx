import { useState } from 'react';
import './TechnologyCard.css';
import './TechnologyNotes.css';

function TechnologyCard({ id, title, description, status, notes, category = 'frontend', onStatusChange, onNotesChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localNotes, setLocalNotes] = useState(notes);

    const handleSaveNotes = () => {
        onNotesChange(id, localNotes);
        setIsEditing(false);
    };

    const statusColors = {
        'not-started': '#ffebee',
        'in-progress': '#fff8e1',
        'completed': '#e8f5e9'
    };

    const statusLabels = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };

    return (
        <div className="technology-card" style={{ backgroundColor: statusColors[status] }}>
            <div className="card-header">
                <h3>{title}</h3>
                <span className={`status-badge status-${status}`}>
                    {statusLabels[status]}
                </span>
            </div>
            
            <p className="description">{description}</p>
            
            <div className="card-category">
                <span className="category-label">Категория: </span>
                <span className={`category-value category-${category}`}>
                    {category === 'frontend' ? 'Фронтенд' : 
                     category === 'backend' ? 'Бэкенд' : 
                     category === 'database' ? 'Базы данных' : 'Другое'}
                </span>
            </div>

            <div className="status-controls">
                <button 
                    className={`status-btn ${status === 'not-started' ? 'active' : ''}`}
                    onClick={() => onStatusChange(id, 'not-started')}
                >
                    Не начато
                </button>
                <button 
                    className={`status-btn ${status === 'in-progress' ? 'active' : ''}`}
                    onClick={() => onStatusChange(id, 'in-progress')}
                >
                    В процессе
                </button>
                <button 
                    className={`status-btn ${status === 'completed' ? 'active' : ''}`}
                    onClick={() => onStatusChange(id, 'completed')}
                >
                    Выполнено
                </button>
            </div>

            <div className="notes-section">
                <h4>Мои заметки:</h4>
                {isEditing ? (
                    <div className="notes-edit">
                        <textarea
                            value={localNotes}
                            onChange={(e) => setLocalNotes(e.target.value)}
                            rows="3"
                            placeholder="Записывайте сюда важные моменты..."
                        />
                        <div className="notes-buttons">
                            <button onClick={handleSaveNotes}>Сохранить</button>
                            <button onClick={() => setIsEditing(false)}>Отмена</button>
                        </div>
                    </div>
                ) : (
                    <div className="notes-view">
                        <p>{notes || 'Нет заметок'}</p>
                        <button onClick={() => setIsEditing(true)}>
                            {notes ? 'Редактировать' : 'Добавить заметки'}
                        </button>
                    </div>
                )}
                <div className="notes-hint">
                    {notes ? `Заметка сохранена (${notes.length} символов)` : 'Добавьте заметку'}
                </div>
            </div>
        </div>
    );
}

export default TechnologyCard;