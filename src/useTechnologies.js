import useLocalStorage from './useLocalStorage';

// Начальные данные для технологий
const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 3,
        title: 'HTML & CSS',
        description: 'Основы верстки',
        status: 'in-progress',
        notes: 'Пройдены основные теги и стили',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'Express.js',
        description: 'Создание REST API',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 5,
        title: 'MongoDB',
        description: 'Работа с NoSQL базой данных',
        status: 'not-started',
        notes: '',
        category: 'database'
    },
    {
        id: 6,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 7,
        title: 'State Management',
        description: 'Работа с состоянием компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 8,
        title: 'React Hooks',
        description: 'Изучение useState, useEffect и других хуков',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    // Функция для обновления статуса технологии
    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Функция для обновления заметок
    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    // Функция для расчета общего прогресса
    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    // Функция для отметки всех как выполненных
    const markAllCompleted = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    // Функция для сброса всех статусов
    const resetAll = () => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetAll,
        progress: calculateProgress()
    };
}

export default useTechnologies;