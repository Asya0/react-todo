import { React } from "react";
import { IoIosAdd } from "react-icons/io";

const AddTask = ({ onAdd, isValue, setIsValue, isPriority, setIsPriority }) => {

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("нажата клавиша Enter")
    }
  }

  return (
    <div className="flex items-center justify-center mb-10  m-auto">
      <input
        className=" text-white pl-10 pr-10 pt-3 pb-3 rounded-md bg-[#f1ffed15]"
        onKeyPress={handleKeyPress}
        type="text"
        value={isValue}
        placeholder="введите название задачи"
        onChange={(e) => { setIsValue(e.target.value) }}
      />
      <select  value={isPriority} onChange={(e) => { setIsPriority(e.target.value) }}>
        <option value="low">🟢</option>
        <option value="medium">🟡</option>
        <option value="high">🔴</option>
      </select>
      <IoIosAdd size={30} onClick={() => onAdd(isValue, setIsPriority )} />
    </div>
  );
};
export default AddTask;
