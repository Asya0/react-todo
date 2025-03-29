import React from "react";
import { CiTrash } from "react-icons/ci";

const Task = ({ id, title, isCompleted, onRemove, onCheck }) => {
  return (
    <>
      <div className="w-full rounded-lg border border-gray-200 flex items-center justify-between p-4">
        {id}
        <input
          className="mr-2 w-6 h-6 rounded-lg"
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            onCheck(id);
          }}
        />
        <span className="flex-grow">{title}</span>
        {/* <button
          onClick={() => onEdit(id, prompt("Редактировать задачу", title))}
        >
          Редактировать
        </button> */}
        <CiTrash
          className="cursor-pointer"
          size={30}
          onClick={() => onRemove(id)}
        />
      </div>
      <div
        onClick={() => {
          console.log("Tasl.jsx");
        }}
      ></div>
    </>
  );
};
export default Task;
