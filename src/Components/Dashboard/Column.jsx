//библиотеки
import { React } from "react";
import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
const Column = ({ title, tasks, onCheck, onRemove, onEdit, status, changePriority, isPriority }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      className="mr-5 bg-[#bdc0c2] rounded-2xl w-full pt-2 pr-3 pb-2 pl-3"
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
            task={task}
            id={task.id}
            changePriority={changePriority}
            isPriority={isPriority}
            onCheck={onCheck}
            onRemove={onRemove}
            onEdit={onEdit}
            {...task}
            // isCompleted={task.status}
          />
        ))}
    </div>
  );
};
export default Column;
