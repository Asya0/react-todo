import { IoIosAdd } from "react-icons/io";
import Task from "./Task";

const TaskList = ({
  tasks,
  onCheck,
  onRemove,
  onAdd,
  onEdit,
  isValue,
  setIsValue,
}) => {
  // console.log("Tasks in TaskList:", tasks);
  return (
    <>
      <div className="flex items-center justify-between mb-2.5 p-2.5 rounded-sm">
        <input
          type="text"
          value={isValue}
          placeholder="название задачи"
          onChange={(e) => setIsValue(e.target.value)}
        />
        <IoIosAdd size={40} onClick={() => onAdd(isValue)} />
      </div>

      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          {...task}
          title={task.title}
          isCompleted={task.isCompleted}
          onCheck={onCheck}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TaskList;
