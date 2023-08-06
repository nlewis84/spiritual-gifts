import { Form, useSubmit } from "@remix-run/react";
import React, { useState } from "react";

type Question = {
  id: number;
  text: string;
};

type Props = {
  questions: Question[];
};

export default function QuestionForm({ questions }: Props) {
  const submit = useSubmit();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>(
    {}
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Handle form submission, e.g., send data to the server or store it in state.
    console.log("Form data:", data);

    // Mark the answered question as true
    const currentQuestionId = Object.keys(selectedOptions)[0];
    if (currentQuestionId) {
      setAnsweredQuestions((prevAnsweredQuestions) => ({
        ...prevAnsweredQuestions,
        [currentQuestionId]: true,
      }));
    }

    // Reset the form after submission (optional)
    event.currentTarget.reset();

    // If you need to navigate after form submission, use `submit` function
    // For example, to redirect to another page, use: `submit("/success")`
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} className="pt-2 space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className={`border bg-white p-4 rounded-md shadow-md ${
            answeredQuestions[`question_${question.id}`]
              ? "opacity-60"
              : "opacity-100"
          }`}
        >
          <p className="text-xl font-semibold mb-1">{question.text}</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((optionValue) => (
              <label
                key={`question_${question.id}_${optionValue}`}
                htmlFor={`question_${question.id}_${optionValue}`}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedOptions[`question_${question.id}`] ===
                  optionValue.toString()
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-blue-600 hover:bg-blue-100"
                }`}
              >
                <input
                  type="radio"
                  id={`question_${question.id}_${optionValue}`}
                  name={`question_${question.id}`}
                  value={optionValue}
                  onChange={handleRadioChange}
                  className="sr-only"
                />
                {optionValue}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </Form>
  );
}
