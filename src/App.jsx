import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, React } from "react";
import TaskList from "./TaskList";
import Columns from "./Components/Dashboard/Columns";
import "./App.css";
import "./index.css";

const App = () => {
  const [isValue, setIsValue] = useState("");
  const [taskList, setTaskList] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      console.log("Loaded tasks from localStorage:", parsedTasks);
      return parsedTasks;
    } catch (e) {
      console.log("Ошибка при чтении из localStorage: ", e);
      return [];
    }
  });

  // Сохранение задач в localStorage при изменении taskList
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    console.log("taskList", taskList);
    // сохраняет, но не отображает на экране все задачи
  }, [taskList]);

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
    setTaskList((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  // const addTask = (title) => {
  //   setTaskList((prevTasks) => {
  //     if (isValue === "" || isValue.trim() === "") {
  //       alert("введите название задачи");
  //       setIsValue("");
  //       // return;
  //     }
  //     const newTask = { id: prevTasks.length + 1, title, isCompleted: false };
  //     setIsValue("");
  //     return [...prevTasks, newTask];
  //   });
  // };
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
    console.log("id всех задач: ", newTask.id);
    setTaskList((prev) => [...prev, newTask]);
    setIsValue("");
  };

  const onEdit = (id, newTitle) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
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
        <Columns tasks={taskList} onEdit={onEdit} />

        <div className="flex flex-col items-start gap-y-4">
          <TaskList
            tasks={taskList}
            onCheck={checkTask}
            onRemove={removeTask}
            onAdd={addTask}
            isValue={isValue}
            setIsValue={setIsValue}
            onEdit={onEdit}
          />
        </div>
      </div>
    </>
  );
};
export default App;
