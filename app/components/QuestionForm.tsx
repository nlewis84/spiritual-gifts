import { Form, useSubmit } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
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

  const formRef = useRef<HTMLFormElement>(null);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const groupName = event.target.name;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [groupName]: event.target.value,
    }));

    // Find the index of the current question in the questions array
    const currentQuestionIndex = questions.findIndex(
      (question) => `question_${question.id}` === groupName
    );

    // Scroll to the next question
    if (
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < questions.length - 1
    ) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      const nextQuestionRef =
        questionRefs.current[`question_${nextQuestion.id}`];
      if (nextQuestionRef) {
        nextQuestionRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
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
    <Form className="space-y-4 pt-2" method="post" action="/">
      {questions.map((question) => {
        const groupName = `question_${question.id}`;
        const selectedOption = selectedOptions[groupName] || "";
        const isAnswered = checkIsAnswered(groupName);

        return (
          <div
            key={question.id}
            ref={(ref) => {
              questionRefs.current[groupName] = ref;
            }}
            className={`max-w-md rounded-md border bg-white p-4 shadow-md transition-opacity duration-500 ${
              isAnswered ? "opacity-60" : "opacity-100"
            }`}
          >
            <p className="mb-1 text-xl font-semibold">{question.text}</p>
            <div className="flex justify-around">
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
