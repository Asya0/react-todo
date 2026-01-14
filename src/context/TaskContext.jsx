import { createContext, useReducer, useContext, useEffect, useCallback, useState } from 'react';
import { taskService } from '../services/taskService';

const TaskStateContext = createContext(null);
const TaskDispatchContext = createContext(null);

// Функция для инициализации состояния из localStorage

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS': {
      return action.payload || [];
    }
    case 'ADD_TASK': {
      const { id, title, priority } = action.payload;

      const newTask = {
        id,
        title,
        isCompleted: false,
        status: 'not_started',
        priority,
        createdAt: Date.now(),
      };
      return [newTask, ...state];
    }
    case 'EDIT_TASK': {
      const { id, title, status, isCompleted } = action.payload;

      return state.map((t) => (t.id === id ? { ...t, title, status, isCompleted } : t));
    }
    case 'DELETE_TASK': {
      const { id } = action.payload;
      return state.filter((t) => t.id !== id);
    }
    case 'CHECK_TASK': {
      const { id } = action.payload;

      return state.map((t) =>
        t.id === id
          ? {
              ...t,
              isCompleted: !t.isCompleted,
              status: !t.isCompleted ? 'done' : 'not_started',
            }
          : t,
      );
    }
    case 'MOVE_TASK': {
      const { id, status, isCompleted } = action.payload;

      return state.map((t) =>
        t.id === id
          ? {
              ...t,
              status: status,
              isCompleted: status === 'done' ? true : false,
            }
          : t,
      );
    }
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, []);
  const [isLoading, setIsLoading] = useState(true);

  const formatTaskFromApi = (apiTask) => ({
    id: apiTask.id,
    title: apiTask.title,
    isCompleted: apiTask.completed || apiTask.isCompleted || false,
    status: apiTask.status || (apiTask.completed ? 'done' : 'not_started'),
    priority: apiTask.priority,
    createdAt: apiTask.createdAt || new Date().getTime(),
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const tasks = await taskService.getAll();
        console.log(tasks, 'задачи из апишки');

        const formattedTasks = tasks.map(formatTaskFromApi);
        dispatch({ type: 'SET_TASKS', payload: formattedTasks });
      } catch (error) {
        console.log('Error to load tasks', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const value = {
    tasks: state,
    isLoading,
  };

  const apiDispatch = useCallback(async (action) => {
    try {
      switch (action.type) {
        // при создании задачи обновлять список задач
        case 'ADD_TASK':
          const newTask = await taskService.createTask(action.payload);
          console.log(newTask, 'новая задача');
          const formattedTask = {
            id: newTask.id, // или свой уникальный ID
            title: newTask.title,
            isCompleted: false, // новая задача всегда не выполнена
            status: 'not_started',
            priority: action.payload.priority || 'medium', // берем из action.payload
            createdAt: Date.now(),
          };
          console.log(formattedTask, 'formattedTask');
          dispatch({ type: 'ADD_TASK', payload: formattedTask });
          break;

        case 'EDIT_TASK':
          console.log('EDIT_TASK - что пришло:', action.payload);
          console.log('ID задачи:', action.payload.id);
          console.log('Новый title:', action.payload.title);
          const updateTask = await taskService.updateTask(action.payload);
          const formatTask = {
            id: updateTask.id,
            title: updateTask.title,
            status: updateTask.status,
            priority: updateTask.priority,
            isCompleted: updateTask.isCompleted,
          };
          dispatch({ type: 'EDIT_TASK', payload: updateTask });
          break;

        case 'DELETE_TASK':
          console.log('action.payload при удалении:', action.payload);
          console.log('action.payload.id:', action.payload?.id);
          const deleteTask = await taskService.deleteTask(action.payload);
          console.log(deleteTask, 'что возвращает deleteTask');
          const formattedTaskDelete = {
            id: deleteTask.id,
          };
          dispatch({ type: 'DELETE_TASK', payload: formattedTaskDelete });
          break;

        case 'MOVE_TASK':
          const moveTask = await taskService.moveTask(action.payload);

          console.log(moveTask, 'что лежит в moveTask');

          dispatch({ type: 'ADD_TASK', payload: moveTask });
          break;
        default:
          dispatch(action);
      }
    } catch (error) {
      console.log(`Failed to ${action.type}:`, error);
    }
  }, []);

  return (
    <TaskStateContext.Provider value={value}>
      <TaskDispatchContext.Provider value={apiDispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskStateContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TaskDispatchContext);
  if (context === undefined) {
    throw new Error('useTasksDispatch must be used within a TaskProvider');
  }
  return context;
}
