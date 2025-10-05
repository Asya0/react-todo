//библиотеки
import { React } from "react";

//компоненты
import Column from "./Column";
//стили
const Columns = ({ tasks, onEdit, onCheck, onRemove, changePriority, isPriority }) => {
  return (
    <div className="flex gap-3 justify-center m-auto w-full">
      <Column
        status="not_started"
        title="Не начато"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        changePriority={changePriority}
        isPriority={isPriority}
      />
      <Column
        status="process"
        title="В процессе"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        changePriority={changePriority}
        isPriority={isPriority}
      />
      <Column
        status="done"
        title="Выполнено"
        tasks={tasks}
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        changePriority={changePriority}
        isPriority={isPriority}
      />
    </div>
  );
};
export default Columns;
