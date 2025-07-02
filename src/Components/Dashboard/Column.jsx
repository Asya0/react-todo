//библиотеки
import { React } from "react";
import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
const Column = ({ title, tasks, onCheck, onRemove, onEdit, status }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      className="mr-5 bg-[#bdc0c2] rounded-2xl w-full pt-2 pr-3 pb-2 pl-3"
      // className={`column ${isOver ? "bg-blue-600" : ""}`} // чтобы было видно при наведении
      ref={setNodeRef}
      style={{
        maxWidth: 400,
      }}
    >
      <h3 className="text-2xl mb-5">{title}</h3>
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
