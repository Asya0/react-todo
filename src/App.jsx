//библиотеки
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useCallback, React } from "react";
import { DndContext } from "@dnd-kit/core";
// import { Draggable } from "./Draggable";

//компоненты
import AddTask from "./Components/AddTask";
import Columns from "./Components/Dashboard/Columns";

//стили
import "./App.css";
import "./index.css";

const App = () => {
  const [isValue, setIsValue] = useState("");
  const [isPriority, setIsPriority] = useState("low")
  const [taskList, setTaskList] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];  // называется "ленивый useState", чтобы не читать localStorage на каждом рендере
      console.log("Loaded tasks from localStorage:", parsedTasks);
      const normalizedTask = parsedTasks.map((task) => ({
        ...task,
        status: task.status || "not_started",
      }));
      return normalizedTask;
    } catch (e) {
      console.log("Ошибка при чтении из localStorage: ", e);
      return [];
    }
  });

  // Сохранение задач в localStorage при изменении taskList
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    console.log("taskList", taskList);
    // console.log("taskList changed:", taskList);
  }, [taskList]);




  const addTask = useCallback((isValue) => {
    if (isValue.trim() === "") {
      alert("введите название задачи");
      setIsValue("");
      return;
    }
    const newTask = {
      id: uuidv4(),
      title: isValue,
      isCompleted: false,
      status: "not_started",
      priority: isPriority,
    };
    console.log("Задача создана, id созданной задачи: ", newTask.id);
    console.log("приоритет созданной задачи: ", newTask.priority);
    setTaskList((prev) => [newTask, ...prev]); // это называется "функциональное обновление", чтобы не включать tasks в зависимости
    setIsValue("");
  }, [isPriority]); // taskList не нужен в зависимости, потому что используется функц. обновление

  const onEdit = useCallback((id, newTitle) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  },[]);

  //TODO находить нужную задачу и менять ее isChecked, по id
  const checkTask = useCallback((id) => {
    console.log("вызов checkTask");
    setTaskList((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          const isNowCompleted = !t.isCompleted;
          return {
            ...t,
            isCompleted: isNowCompleted,
            status: isNowCompleted ? "done" : "not_started",
          };
        }
        return t;
      })
    );
  },[]);

  const deleteTask = useCallback((id) => {
    setTaskList(prev => prev.filter(t => t.id != id))
    console.log("задача удалена");
  }, []);


  const handleDragEnd = useCallback((e) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTaskList((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: newStatus,
            isCompleted: newStatus === "done" ? true : false,
          };
        }
        return task;
      })
    );
  }, []);

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
