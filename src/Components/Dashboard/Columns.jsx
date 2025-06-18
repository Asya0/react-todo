//библиотеки
import { React } from "react";
// import { useDroppable } from "@dnd-kit/core";
//компоненты
import Task from "../../Task";
import Column from "./Column";
//стили
import "../Dashboard/Columns.css";
const Columns = ({ tasks, onEdit, onCheck, onRemove }) => {
  // const { setNodeRef } = useDroppable({ id: status });
  return (
    <div className="columns">
      {/* вынести column в отдельный компонент */}
      <Column
        status="not_started"
        title="Не начато"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
      />
      <Column
        status="process"
        title="В процессе"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
      />
      <Column
        status="done"
        title="Выполнено"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
      />
      {/* <div className="column" ref={setNodeRef}>
        <h3>Не начато</h3>
        {tasks
          .filter((t) => t.status === "not_started")
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
      <div className="column" ref={setNodeRef}>
        <h3>В процессе</h3>
        {tasks
          .filter((t) => t.status === "process")
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
      <div className="column" ref={setNodeRef}>
        <h3>Выполнено</h3>
        {tasks
          .filter((t) => t.status === "done")
          .map((task) => (
            <Task
              key={task.id}
              {...task}
              onCheck={onCheck}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          ))}
      </div> */}
    </div>
  );
};
export default Columns;
