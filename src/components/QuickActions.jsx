import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ technologies, onMarkAllCompleted, onResetAll }) {
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            totalTechnologies: technologies.length,
            completed: technologies.filter(t => t.status === 'completed').length,
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        
        // Создаем Blob и ссылку для скачивания
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `technologies_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        setShowExportModal(true);
    };

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button 
                    onClick={onMarkAllCompleted} 
                    className="action-btn complete-all"
                >
                    ☑ Отметить все как выполненные
                </button>
                <button 
                    onClick={onResetAll} 
                    className="action-btn reset-all"
                >
                    ☒ Сбросить все статусы
                </button>
                <button 
                    onClick={handleExport} 
                    className="action-btn random-select"
                >
                    📥 Экспорт данных
                </button>
            </div>

            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <div style={{ textAlign: 'center' }}>
                    <p>✅ Данные успешно экспортированы!</p>
                    <p>Файл с данными был загружен на ваш компьютер.</p>
                    <p>Всего технологий: <strong>{technologies.length}</strong></p>
                    <button 
                        onClick={() => setShowExportModal(false)}
                        style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginTop: '15px'
                        }}
                    >
                        Закрыть
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default QuickActions;