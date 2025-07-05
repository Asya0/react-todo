import { React } from "react";
import { IoIosAdd } from "react-icons/io";

const AddTask = ({ onAdd, isValue, setIsValue }) => {
  return (
    <div className="flex items-center justify-center mb-10  m-auto">
      <input
        className=" text-white pl-10 pr-10 pt-3 pb-3 rounded-md bg-[#f1ffed15]"
        type="text"
        value={isValue}
        placeholder="введите название задачи"
        onChange={(e) => setIsValue(e.target.value)}
      />
      <IoIosAdd size={30} onClick={() => onAdd(isValue)} />
    </div>
  );
};
export default AddTask;
