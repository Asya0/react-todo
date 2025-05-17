import Task from "./Task";

const TaskList = ({
  tasks,
  onCheck,
  onRemove,
  // onAdd,
  onEdit,
  // isValue,
  // setIsValue,
}) => {
  // console.log("Tasks in TaskList:", tasks);
  return (
    <>
      {Array.isArray(tasks) &&
        tasks.map((task) => (
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
