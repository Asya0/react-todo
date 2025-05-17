import { React } from "react";
import { IoIosAdd } from "react-icons/io";
import "../Components/AddTask.css";

const AddTask = ({ onAdd, isValue, setIsValue }) => {
  return (
    <div className="add-task">
      <input
        type="text"
        value={isValue}
        placeholder="название задачи"
        onChange={(e) => setIsValue(e.target.value)}
      />
      <IoIosAdd size={40} onClick={() => onAdd(isValue)} />
    </div>
  );
};
export default AddTask;
