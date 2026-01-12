//библиотеки
import React from "react";
import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
const Column = ({ title, tasks, onCheck, onRemove, onEdit, status }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const filteredTasks = tasks.filter((t) => t.status === status)
  // const filteredTasks = tasks.filter((t) => t.id)

  return (
    <div
      className="mr-5 bg-[#262626] rounded-xl w-full pt-2 pr-3 pb-2 pl-3 z-20"
      // className="mr-5 bg-white/10 backdrop-blur-md rounded-xl w-full pt-2 pr-3 pb-2 pl-3 border border-white/20 shadow-lg"
      ref={setNodeRef}
      style={{
        maxWidth: 400,
      }}
    >
      <h3 className="text-2xl mb-5">{title}</h3>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            task={task}
            // title={task.title}
            onCheck={onCheck}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">Задач нет</p>
      )}
      
    </div>
  )
}
  export default Column;
