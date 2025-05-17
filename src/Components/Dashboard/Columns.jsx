import { React } from "react";

import "../Dashboard/Columns.css";
import Task from "../../Task";
const Columns = ({ tasks, onEdit, onCheck, onRemove }) => {
  return (
    <div className="columns">
      <div className="column">
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
      <div className="column">
        <h3>В процессе</h3>
        {/* {tasks.filter((t) => t.status === "process")} */}
      </div>
      <div className="column">
        <h3>Выполнено</h3>
        {/* {tasks.filter((t) => t.status === "done")} */}
      </div>
    </div>
  );
};
export default Columns;
