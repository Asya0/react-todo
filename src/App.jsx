//библиотеки
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, React } from "react";
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
  const [taskList, setTaskList] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
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

  const addTask = () => {
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
    };
    console.log("id созданной задачи: ", newTask.id);
    setTaskList((prev) => [...prev, newTask]);
    setIsValue("");
  };

  const onEdit = (id, newTitle) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };
  //TODO находить нужную задачу и менять ее isChecked, по id
  const checkTask = (id) => {
    console.log("вызов checkTask");
    setTaskList((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };
  const removeTask = (id) => {
    setTaskList((prevTasks) => {
      return prevTasks.filter((t) => t.id !== id);
    });
    console.log("удаление задачи");
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <>
      <h6 className="text-4xl text-fuchsia-600 font-bold">
        Tailwind не работает!
      </h6>

      <div className="max-w-7xl w-full flex flex-col">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold underline hover:text-sky-300">
            To do:
          </h1>
        </div>
        <AddTask onAdd={addTask} isValue={isValue} setIsValue={setIsValue} />
        <DndContext onDragEnd={handleDragEnd}>
          <Columns
            tasks={taskList}
            onEdit={onEdit}
            onCheck={checkTask}
            onRemove={removeTask}
          />
        </DndContext>
      </div>
    </>
  );
};
export default App;
