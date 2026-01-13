//библиотеки
import { React } from "react";

//компоненты
import Column from "./Column";
//стили
const Columns = ({ tasks, onEdit, onCheck, onRemove, isPriority }) => {

  
  return (
    <div className="flex gap-3 justify-center m-auto w-full">
      <Column
        tasks={tasks}
        status="not_started"
        title="Не начато"
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        // changePriority={changePriority}
        isPriority={isPriority}
      />
      <Column
        tasks={tasks}
        status="process"
        title="В процессе"
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        // changePriority={changePriority}
        isPriority={isPriority}
      />
      <Column
        tasks={tasks}
        status="done"
        title="Выполнено"
        onCheck={onCheck}
        onRemove={onRemove}
        onEdit={onEdit}
        // changePriority={changePriority}
        isPriority={isPriority}
      />
    </div>
  );
};
export default Columns;
