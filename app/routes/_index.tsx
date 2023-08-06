import type { V2_MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import QuestionForm from "./QuestionForm";

export const meta: V2_MetaFunction = () => [{ title: "Spiritual Gifts" }];

export default function Index() {
  const { questions } = useRouteLoaderData("root");

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 text-center">
          Spiritual Gifts
        </h1>
        <h2 className="text-lg md:text-xl font-semibold text-blue-600 mb-6 text-center">
          Discover Your God-Given Gifts
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-6 text-center">
          Welcome to the Spiritual Gifts assessment. Uncover the unique gifts God has
          bestowed upon you to serve others in His kingdom.
        </p>
        <div className="flex flex-col items-center">
          {/* Render the QuestionForm component */}
          <QuestionForm questions={questions} />
        </div>
      </div>
    </main>
  );
}
