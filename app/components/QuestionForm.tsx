import { Form, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import QuestionOption from "./QuestionOption";

type Question = {
  id: number;
  text: string;
};

type Props = {
  questions: Question[];
};

export default function QuestionForm({ questions }: Props) {
  const submit = useSubmit();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Record<string, boolean>
  >({});

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

  // TODO: Remove this after done testing
  const setAllTo5 = () => {
    const updatedSelectedOptions: Record<string, string> = {};
    for (const question of questions) {
      updatedSelectedOptions[`question_${question.id}`] = "5";
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  // Initialize answeredQuestions state for each question
  useEffect(() => {
    const initialAnsweredQuestions: Record<string, boolean> = {};
    questions.forEach((question) => {
      initialAnsweredQuestions[`question_${question.id}`] = false;
    });
    setAnsweredQuestions(initialAnsweredQuestions);
  }, [questions]);

  // Function to check if a question has been answered
  const checkIsAnswered = (groupName: string): boolean => {
    return selectedOptions[groupName] !== undefined;
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {/* TODO: Remove this after done testing */}
      <button
        type="button"
        className="w-full rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
        onClick={setAllTo5}
      >
        Set All to 5
      </button>
      {questions.map((question) => {
        const groupName = `question_${question.id}`;
        const selectedOption = selectedOptions[groupName] || "";
        const isAnswered = checkIsAnswered(groupName);

        console.log(isAnswered);
        return (
          <div
            key={question.id}
            className={`rounded-md border bg-white p-4 shadow-md transition-opacity duration-500 ${
              isAnswered ? "opacity-60" : "opacity-100"
            }`}
          >
            <p className="mb-1 text-xl font-semibold">{question.text}</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((optionValue) => (
                <QuestionOption
                  key={`question_${question.id}_${optionValue}`}
                  optionValue={optionValue}
                  isSelected={selectedOption === optionValue.toString()}
                  onChange={handleRadioChange}
                  groupName={groupName}
                />
              ))}
            </div>
          </div>
        );
      })}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </Form>
  );
}
