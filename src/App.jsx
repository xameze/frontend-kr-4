import { useState } from 'react';
import './App.css';

// Импорт компонентов из практического занятия №19 (Базовые элементы)
import Greeting from './Greeting';
import UserCard from './UserCard';
import TaskList from './TaskList';

// Импорт компонентов из практического занятия №20 (Менеджер состояний)
import Counter from './Counter';
import RegistrationForm from './RegistrationForm';
import ColorPicker from './ColorPicker';

// Импорт компонентов из практического занятия №21 (useEffect и LocalStorage)
import WindowSizeTracker from './WindowSizeTracker';
import UserProfile from './UserProfile';
import ContactForm from './ContactForm';

// Импорт компонентов трекера технологий ИЗ ПАПКИ components
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import TechFilter from './components/TechFilter';
import ProgressBar from './components/ProgressBar';
import SimpleModalExample from './components/SimpleModalExample';

// Импорт кастомных хуков
import useTechnologies from './useTechnologies';

function App() {
  // === ИСПОЛЬЗОВАНИЕ КАСТОМНОГО ХУКА useTechnologies ===
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    progress
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // === ЛОГИКА ФИЛЬТРАЦИИ ===
  const filteredByStatus = activeFilter === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.status === activeFilter);

  const filteredTechnologies = filteredByStatus.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Фронтенд и бэкенд разработка - Практические занятия 19-22</h1>

      {/* Практическое занятие №19 */}
      <section className="practice-section">
        <h2>Базовые элементы React.js и JSX</h2>
        <div className="examples-grid">
          <div className="example-card">
            <h3>Пример 1: Динамическое приветствие</h3>
            <Greeting />
          </div>
          
          <div className="example-card">
            <h3>Пример 2: Компонент с props</h3>
            <UserCard
              name="Подгузов Максим"
              role="Администратор"
              avatarUrl="https://i.pravatar.cc/150?img=1"
              isOnline={true}
            />
          </div>
          
          <div className="example-card">
            <h3>Пример 3: Работа со списками</h3>
            <TaskList />
          </div>
        </div>
      </section>

      {/* Практическое занятие №20 */}
      <section className="practice-section">
        <h2>Менеджер состояний и компонентов</h2>
        <div className="examples-grid">
          <div className="example-card">
            <h3>Пример 1: Хук useState</h3>
            <Counter />
          </div>
          
          <div className="example-card">
            <h3>Пример 2: Работа с формами</h3>
            <RegistrationForm />
          </div>
          
          <div className="example-card">
            <h3>Пример 3: Подъём состояния</h3>
            <ColorPicker />
          </div>
        </div>
      </section>

      {/* Практическое занятие №21 */}
      <section className="practice-section">
        <h2>Менеджер эффектов и контролируемые поля</h2>
        <div className="examples-grid">
          <div className="example-card">
            <h3>Пример 1: Хук useEffect</h3>
            <WindowSizeTracker />
          </div>
          
          <div className="example-card">
            <h3>Пример 2: Работа с API</h3>
            <UserProfile />
          </div>
          
          <div className="example-card">
            <h3>Пример 3: Форма с валидацией</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Практическое занятие №22 */}
      <section className="practice-section">
        <h2>Переиспользуемые компоненты и локальное хранилище</h2>
        <div className="examples-grid">
          <div className="example-card">
            <h3>Пример 1: Модальное окно</h3>
            <SimpleModalExample />
          </div>
          
          <div className="example-card">
            <h3>Пример 2: Прогресс-бар</h3>
            <ProgressBar 
              progress={75}
              label="Демонстрация прогресса"
              color="#2196F3"
              animated={true}
              height={25}
            />
            <div style={{ marginTop: '20px' }}>
              <ProgressBar 
                progress={45}
                label="Изучение React"
                color="#4CAF50"
                animated={true}
              />
              <ProgressBar 
                progress={80}
                label="Изучение JavaScript"
                color="#FF9800"
                animated={true}
              />
            </div>
          </div>
          
          <div className="example-card">
            <h3>Пример 3: Кастомный хук useLocalStorage</h3>
            <div className="storage-info">
              <p>📚 В этом проекте используется кастомный хук <strong>useLocalStorage</strong></p>
              <p>Он автоматически сохраняет все данные трекера технологий в локальное хранилище браузера.</p>
              <p>Попробуйте обновить страницу - ваши заметки и статусы сохранятся!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Основной проект: Трекер изучения технологий */}
      <section className="practice-section main-project">
        <h2>🎯 Трекер изучения технологий (Основной проект)</h2>
        
        <ProgressHeader technologies={technologies} />
        
        <div className="tracker-controls">
          <QuickActions 
            technologies={technologies} 
            onMarkAllCompleted={markAllCompleted}
            onResetAll={resetAll}
          />
          
          <TechFilter 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
          
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Поиск технологий..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-results">Найдено: {filteredTechnologies.length}</span>
          </div>
        </div>
        
        <div className="technologies-list">
          {filteredTechnologies.length > 0 ? (
            filteredTechnologies.map(tech => (
              <TechnologyCard
                key={tech.id}
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                notes={tech.notes}
                category={tech.category}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
              />
            ))
          ) : (
            <div className="no-results">
              <p>Технологий не найдено. Попробуйте изменить фильтр или поисковый запрос.</p>
            </div>
          )}
        </div>
        
        <div className="storage-info">
          <p>
            💾 Данные автоматически сохраняются в LocalStorage с помощью кастомного хука <strong>useTechnologies</strong>. 
            Общий прогресс: <strong>{progress}%</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;