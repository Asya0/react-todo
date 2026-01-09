import { createContext, useReducer, useContext, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";

const TaskStateContext = createContext(null);
const TaskDispatchContext = createContext(null);

// Функция для инициализации состояния из localStorage

function taskReducer(state, action) {
  switch (action.type) {
    // case "SET_TASKS": {
    //   return action.payload;
    // }
    case "SET_TASKS": {
      return action.payload || [];
    }
    case "ADD_TASK": {
      const { title, priority } = action.payload;

      const newTask = {
        id: crypto.randomUUID(),
        title,
        isCompleted: false,
        // status: "not_started",
        // priority,
        // createdAt: Date.now(),
      };
      return [newTask, ...state];
    }
    case "EDIT_TASK": {
      const { id, title } = action.payload;

      return state.map(t => t.id === id
        ? { ...t, title }
        : t);
    }
    case "DELETE_TASK": {
      const { id } = action.payload;
      return state.filter(t => t.id !== id);
    }
    case "CHECK_TASK": {
      const { id } = action.payload;

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
      const { id, status } = action.payload;

      return state.map(t => t.id === id
        ? {
          ...t,
          status: status,
          isCompleted: status === "done"
        }
        : t
      );
    }
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, []);

  const formatTaskFromApi = (apiTask) => ({
    id: apiTask.id,
    title: apiTask.title,
    isCompleted: apiTask.completed,
    status: apiTask.completed ? "done" : "not_started",
    priority: "medium", // пока хардкод
    createdAt: new Date().getTime(),
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await taskService.getAll();
        console.log(tasks, "задачи из апишки")

        const formattedTasks = tasks.map(formatTaskFromApi);
        dispatch({ type: "SET_TASKS", payload: formattedTasks })
      }
      catch (error) {
        console.log("Error to load tasks", error)
      }
    }
    loadTasks();
  }, [])

  const apiDispatch = useCallback(async (action) => {
    try {
      switch (action.type) {
        case "ADD_TASK":
          const newTask = await taskService.createTask(action.payload);
          console.log(newTask, "новая задача");
          const formattedTask = {
            id: apiTask.id, // или свой уникальный ID
            title: apiTask.title,
            isCompleted: false, // новая задача всегда не выполнена
            status: "not_started",
            priority: action.payload.priority || "medium", // берем из action.payload
            createdAt: Date.now()
          };
          dispatch({ type: "ADD_TASK", payload: formattedTask })
          break;

        //case "EDIT_TASK:..."
        default: dispatch(action);
      }
    }
    catch (error) {
      console.log(`Failed to ${action.type}:`, error)
    }
  }, [])

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={apiDispatch}>
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


