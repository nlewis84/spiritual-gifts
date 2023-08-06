import { Form, useSubmit } from "@remix-run/react";
import React from "react";

type Question = {
  id: number;
  text: string;
};

type Props = {
  questions: Question[];
};

export default function QuestionForm({ questions }: Props) {
  const submit = useSubmit();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Handle form submission, e.g., send data to the server or store it in state.
    // Replace the following log statement with the logic to handle form submission.
    console.log("Form data:", data);

    // Reset the form after submission (optional)
    event.currentTarget.reset();

    // If you need to navigate after form submission, use `submit` function
    // For example, to redirect to another page, use: `submit("/success")`
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.text}</p>
          <div className="space-x-2">
            <input
              type="radio"
              id={`question_${question.id}_1`}
              name={`question_${question.id}`}
              value="1"
            />
            <label htmlFor={`question_${question.id}_1`}>1</label>
            <input
              type="radio"
              id={`question_${question.id}_2`}
              name={`question_${question.id}`}
              value="2"
            />
            <label htmlFor={`question_${question.id}_2`}>2</label>
            <input
              type="radio"
              id={`question_${question.id}_3`}
              name={`question_${question.id}`}
              value="3"
            />
            <label htmlFor={`question_${question.id}_3`}>3</label>
            <input
              type="radio"
              id={`question_${question.id}_4`}
              name={`question_${question.id}`}
              value="4"
            />
            <label htmlFor={`question_${question.id}_4`}>4</label>
            <input
              type="radio"
              id={`question_${question.id}_5`}
              name={`question_${question.id}`}
              value="5"
            />
            <label htmlFor={`question_${question.id}_5`}>5</label>
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
