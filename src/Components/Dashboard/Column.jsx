//библиотеки
import { React } from "react";
import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
const Column = ({ title, tasks, onCheck, onRemove, onEdit, status }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  // console.log("Column", title, tasks);

  return (
    <div
      // className="column"
      className={`column ${isOver ? "bg-blue-600" : ""}`} // чтобы было видно при наведении
      ref={setNodeRef}
    >
      <h3>{title}</h3>
      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
          <Task
            key={task.id}
            id={task.id}
            onCheck={onCheck}
            onRemove={onRemove}
            onEdit={onEdit}
            {...task}
          />
        ))}
    </div>
  );
};
export default Column;
