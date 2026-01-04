import { createContext, useReducer, useContext, useEffect } from "react";

const TaskStateContext = createContext(null);
const TaskDispatchContext = createContext(null);

// Функция для инициализации состояния из localStorage
const initializer = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      console.log("Tasks loaded from localStorage:", parsedTasks);
      return parsedTasks;
    }
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
  }
  return [];
};

function taskReducer(state, action) {
  switch(action.type) {
    case "ADD_TASK": {
      const {title, priority} = action.payload;

      const newTask = {
        id: crypto.randomUUID(),
        title,
        isCompleted: false,
        status: "not_started",
        priority,
        createdAt: Date.now(),
      };
      return [newTask, ...state];
    }
    case "EDIT_TASK": {
      const {id, title} = action.payload;
      
      return state.map(t => t.id === id 
        ? { ...t, title} 
        : t);
    }
    case "DELETE_TASK": {
      const {id} = action.payload;
      return state.filter(t => t.id !== id);
    }
    case "CHECK_TASK": {
      const {id} = action.payload;

      return state.map(t => t.id === id 
        ? {
            ...t,
            isCompleted: !t.isCompleted,
            status: !t.isCompleted ? "done" : "not_started"
          }
        : t
      );
    }
    case "MOVE_TASK": {
      const {id, status} = action.payload;

      return state.map(t => t.id === id 
        ? {
            ...t,
            status: status,
            isCompleted: status === "done"
          }
        : t
      );
    }
    case "SET_TASKS": {
      return action.payload || [];
    }
    default: 
      return state;
  }
}

export function TaskProvider({children}) {
    const [state, dispatch] = useReducer(taskReducer, [], initializer);

    // Автоматическое сохранение в localStorage при изменении state
    useEffect(() => {
      try {
        localStorage.setItem("tasks", JSON.stringify(state));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }, [state]);

    return(
        <TaskStateContext.Provider value={state}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskStateContext.Provider>
    )
}

export function useTasks() {
    const context = useContext(TaskStateContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context || [];
}

export function useTasksDispatch() {
    const context = useContext(TaskDispatchContext);
    if (context === undefined) {
        throw new Error("useTasksDispatch must be used within a TaskProvider");
    }
    return context;
}


