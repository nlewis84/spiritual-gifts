import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useRouteLoaderData } from "@remix-run/react";
import QuestionForm from "../components/QuestionForm";
import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Spiritual Gifts" }];

export default function Index() {
  const { questions } = useRouteLoaderData("root");

  const user = useOptionalUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-b from-blue-900 to-blue-500 p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-3xl font-bold text-blue-800 md:text-4xl">
          Spiritual Gifts
        </h1>
        <h2 className="mb-4 text-center text-lg font-semibold text-blue-600 md:text-xl">
          Discover Your God-Given Gifts
        </h2>
        <p className="mb-4 text-center text-base text-gray-600 md:text-lg">
          Welcome to the Spiritual Gifts assessment. Uncover the unique gifts
          God has bestowed upon you to serve others in His kingdom.
        </p>
        <div className="flex flex-col items-center">
          {/* {user ? (
            <Link
              to="/logout"
              className="mb-4 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 md:mb-0 md:w-auto"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/join"
                className="mb-4 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 md:w-auto"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="w-full rounded-md bg-white px-6 py-3 font-bold text-blue-600 shadow-md hover:bg-blue-50 md:w-auto"
              >
                Log In
              </Link>
            </>
          )} */}
        </div>
      </div>
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 text-center text-lg text-gray-600">
          <strong>DIRECTIONS</strong>
        </div>
        <p className="mb-6 rounded-lg bg-blue-100 p-4 pl-4 text-left text-base text-blue-600 md:text-lg">
          This is not a test, so there are no wrong answers. The Spiritual Gifts
          Survey consists of 80 statements. Some items reflect concrete actions,
          other items are descriptive traits, and still others are statements of
          belief.
        </p>
        <div className="mb-6 pl-4 text-left text-base text-gray-600 md:text-lg">
          <strong>Response Choices:</strong>
        </div>
        <ol className="mb-6 list-inside rounded-lg bg-blue-100 p-4 text-left text-blue-600">
          <li className="mb-4">
            <div className="mr-2 inline-block h-8 w-8 rounded-full bg-blue-700 text-center text-base font-bold leading-8 text-white">
              1
            </div>{" "}
            Not at all characteristic of me. Definitely untrue for me
          </li>
          <li className="mb-4">
            <div className="mr-2 inline-block h-8 w-8 rounded-full bg-blue-700 text-center text-base font-bold leading-8 text-white">
              2
            </div>{" "}
            Occasionally characteristic of me. True for me–about 25 percent of
            the time
          </li>
          <li className="mb-4">
            <div className="mr-2 inline-block h-8 w-8 rounded-full bg-blue-700 text-center text-base font-bold leading-8 text-white">
              3
            </div>{" "}
            Frequently characteristic of me. True for me–about 50 percent of the
            time
          </li>
          <li className="mb-4">
            <div className="mr-2 inline-block h-8 w-8 rounded-full bg-blue-700 text-center text-base font-bold leading-8 text-white">
              4
            </div>{" "}
            Most of the time this would describe me or be true for me
          </li>
          <li className="mb-4">
            <div className="mr-2 inline-block h-8 w-8 rounded-full bg-blue-700 text-center text-base font-bold leading-8 text-white">
              5
            </div>{" "}
            Highly characteristic of me. Definitely true for me
          </li>
        </ol>
        <div className="mb-6 pl-4 text-left text-base text-gray-600 md:text-lg">
          <strong>Instructions:</strong>
        </div>
        <ul className="mb-6 list-inside list-disc rounded-lg bg-blue-100 p-4 text-left">
          <li className="mb-2 text-blue-600">
            Select the number you feel best characterizes yourself.
          </li>
          <li className="mb-2 text-blue-600">
            Do not spend too much time on any one item. Remember, it is not a
            test. Usually your immediate response is best.
          </li>
          <li className="mb-2 text-blue-600">
            Please give an answer for each item. Do not skip any items.
          </li>
          <li className="mb-2 text-blue-600">
            Do not ask others how they are answering or how they think you
            should answer.
          </li>
          <li className="mb-2 text-blue-600">Work at your own pace.</li>
        </ul>
      </div>
      <QuestionForm questions={questions} />
    </main>
  );
}
