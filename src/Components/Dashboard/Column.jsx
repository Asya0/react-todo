//библиотеки
import { React, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
const Column = ({ title, tasks, onCheck, onRemove, onEdit, status }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  useEffect(() => {
    console.log(isOver, "isOver");
    console.log("bpvtytybt");
  }, []);

  return (
    <div
      // className="column"
      ref={setNodeRef}
      className={`column ${isOver ? "bg-blue-100" : ""}`} // чтобы было видно при наведении
    >
      <h3>{title}</h3>
      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
          <Task
            key={task.id}
            {...task}
            onCheck={onCheck}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
};
export default Column;
