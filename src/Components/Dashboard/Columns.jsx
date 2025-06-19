//библиотеки
import { React } from "react";

//компоненты
import Task from "../../Task";
import Column from "./Column";
//стили
import "../Dashboard/Columns.css";
const Columns = ({ tasks, onEdit, onCheck, onRemove }) => {
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
    </div>
  );
};
export default Columns;
