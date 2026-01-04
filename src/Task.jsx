import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CiTrash, CiEdit, CiCircleCheck } from "react-icons/ci";
import { IoIosMove, IoMdCheckmark } from "react-icons/io";

import "./Components/Task.css";

const TaskComponent = ({ id, title, onRemove, onCheck, onEdit, task, isCompleted }) => {

  // const Task = React.memo() => { // почему-то при React.memo undefined
  // const { id, title, isCompleted, } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };
  useEffect(() => {
    console.log("render task", title, id);
  }, []);

  const saveEdit = () => {
    console.log("сохранение редактирования задачи");
    onEdit(id, editedTitle);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="task mr-5 glass-effect rounded-xl w-full pt-2 pr-3 pb-2 pl-3"
        ref={setNodeRef}
        style={style}
      >
        <label className="mr-2 flex items-center cursor-pointer relative">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onCheck(id)}
            className="peer sr-only"
          />

          <div
            className="
          w-4 h-4 rounded border border-gray-400
          flex items-center justify-center
          peer-checked:border-slate-500
        "
          >
            {task.isCompleted && (
              <IoMdCheckmark size="22" className="text-slate-300 text-lg m-0" />
            )}
          </div>
        </label>

        {isEditing ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => {
                if (e.key == "Enter") saveEdit();
              }}
            />
            <CiCircleCheck
              size={10}
              onClick={saveEdit}
              style={{ position: "absolute", right: 5 }}
            />
          </div>
        ) : (
          <span
            style={{
              textDecoration: task.isCompleted ? "line-through " : "",
              textDecorationColor: task.isCompleted ? "#a3a3a3 " : "",
              color: task.isCompleted ? "#a3a3a3" : "",
            }}
            className={`flex-grow max-w-[220px] w-[220px] ${isCompleted ? "text-green-600" : ""}`}
            onDoubleClick={() => {
              setEditedTitle(title);
              setIsEditing(true);
            }}
          >
            {task.title}
          </span>
        )}

        <div>
          {task.priority === "low" && "🟢"}
          {task.priority === "medium" && "🟡"}
          {task.priority === "high" && "🔴"}
        </div>

        <div className="task-tools">
          <CiEdit
            size={20}
            onClick={() => onEdit(id, prompt("Редактировать задачу", title))}
          />

          <CiTrash
            className="cursor-pointer"
            size={20}
            onClick={() => {
              console.log("CLICKED");
              onRemove(id);
              console.log("delete task");
            }}
          />
          <IoIosMove size={20} {...listeners} {...attributes} />
        </div>
      </div>
      <div
        onClick={() => {
          console.log("Task.jsx");
        }}
      ></div>
    </>
  );
};

const Task = React.memo(TaskComponent);

export default Task;
