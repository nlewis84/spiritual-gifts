import React from "react";

type Props = {
  optionValue: number;
  isSelected: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  groupName: string;
};

const QuestionOption: React.FC<Props> = ({
  optionValue,
  isSelected,
  onChange,
  groupName,
}) => {
  return (
    <label
      htmlFor={`question_${groupName}_${optionValue}`}
      className={`cursor-pointer rounded-lg p-2 transition-all duration-300 ${
        isSelected
          ? "scale-105 transform border-blue-500 bg-blue-200 text-blue-800"
          : "border-gray-300 bg-white text-blue-600 hover:bg-blue-100"
      }`}
    >
      <input
        type="radio"
        id={`question_${groupName}_${optionValue}`}
        name={groupName}
        value={optionValue}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          isSelected ? "border-blue-500 bg-blue-300" : "border-gray-300"
        }`}
      >
        {optionValue}
      </div>
    </label>
  );
};

export default QuestionOption;
