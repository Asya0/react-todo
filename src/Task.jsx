import { React, useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CiTrash, CiEdit, CiCircleCheck } from "react-icons/ci";
import { IoIosMove } from "react-icons/io";

import "./Components/Task.css";

const Task = ({ key, onRemove, onCheck, onEdit, changePriority, task }) => {
  const { id, title, isCompleted, isPriority } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    // cursor: "grab",
  };
  useEffect(() => {
    console.log("render task", title, id, key);
  }, []);

  const saveEdit = () => {
    console.log("сохранение редактирования задачи");
    onEdit(id, editedTitle);
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="task"
        ref={setNodeRef}
        style={style}
      // style={{ display: "flex", alignItems: "center" }}
      >
        <input
          className="mr-2 w-6 h-6 rounded-xl"
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            onCheck(id);
          }}
        />

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
              textDecoration: isCompleted ? "line-through " : "",
              textDecorationColor: isCompleted ? "#a3a3a3 " : "",
              color: isCompleted ? "#a3a3a3" : "",
            }}
            className={`flex-grow ${isCompleted ? "text-green-600" : ""}`}
            onDoubleClick={() => {
              setEditedTitle(title);
              setIsEditing(true);
            }}
          >
            {title}
          </span>
        )}

        <div>
          {task.priority === "low" && "🟢"}
          {task.priority === "medium" && "🟡"}
          {task.priority === "high" && "🔴"}
        </div>

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
      <div
        onClick={() => {
          console.log("Task.jsx");
        }}
      ></div>
    </>
  );
};
export default Task;
