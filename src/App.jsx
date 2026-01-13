//библиотеки
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useCallback, React } from "react";
import { DndContext } from "@dnd-kit/core";

//компоненты
import AddTask from "./Components/AddTask";
import Columns from "./Components/Dashboard/Columns";
import { useTasks, useTasksDispatch } from "./context/TaskContext";

//стили
import "./App.css";
import "./index.css";

const App = () => {
  const [isValue, setIsValue] = useState("");
  const [isPriority, setIsPriority] = useState("low");

  const { tasks: taskList, isLoading } = useTasks();
  const dispatch = useTasksDispatch();

  const addTask = useCallback((title, priority) => {
    if (!title || !title.trim()) {
      alert("Введите название задачи");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        title: title.trim(),
        priority: priority || isPriority
      }
    });
    setIsValue("");
  }, [dispatch, isPriority]);

  const onEdit = useCallback((id, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      alert("Введите название задачи");
      return;
    }
    dispatch({
      type: "EDIT_TASK",
      payload: { id, title: newTitle.trim() }
    });
  }, [dispatch]);

  const checkTask = useCallback((id) => {
    dispatch({
      type: "CHECK_TASK",
      payload: { id }
    });
  }, [dispatch]);

  const deleteTask = useCallback((id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: { id }
    });
  }, [dispatch]);

  const handleDragEnd = useCallback((e) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        id: taskId,
        status: newStatus
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка задач...</div>;
  }


  return (
    <>
      <div className="w-full  flex flex-col justify-center ">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
        </div>
        <AddTask onAdd={addTask} isValue={isValue} setIsValue={setIsValue} isPriority={isPriority} setIsPriority={setIsPriority} />
        <DndContext onDragEnd={handleDragEnd}>
          <Columns
            tasks={taskList}
            onEdit={onEdit}
            onCheck={checkTask}
            onRemove={deleteTask}
            isPriority={isPriority}
          />
        </DndContext>
      </div>
    </>
  );
};
export default App;