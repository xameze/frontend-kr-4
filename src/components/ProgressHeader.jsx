import ProgressBar from './ProgressBar';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Трекер изучения технологий</h2>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>
      
      {/* Используем переиспользуемый ProgressBar вместо старого прогресс-бара */}
      <ProgressBar
        progress={percentage}
        label="Общий прогресс изучения"
        color="#4CAF50"
        height={20}
        animated={true}
        showPercentage={true}
      />
    </div>
  );
}

export default ProgressHeader;