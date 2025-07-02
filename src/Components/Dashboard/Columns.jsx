//библиотеки
import { React } from "react";

//компоненты
import Column from "./Column";
//стили
const Columns = ({ tasks, onEdit, onCheck, onRemove }) => {
  return (
    <div className="flex gap-3 justify-center m-auto w-full">
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
