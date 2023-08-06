import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import { getGifts } from "~/models/gift.server";
import { getQuestions, getQuestionById } from "~/models/question.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// Function to calculate gift totals from form data
const calculateGiftTotals = async (formData) => {
  const giftTotals = {};

  for (const [key, value] of Object.entries(formData)) {
    const questionId = key.replace("question_", "");
    const questionData = await getQuestionById(questionId);
    const answer = parseInt(value);

    if (questionData.gift) {
      const giftName = questionData.gift.name;

      // Convert gift name to camelCase
      const giftNameInCamelCase =
        giftName.charAt(0).toLowerCase() + giftName.slice(1);
      giftTotals[giftNameInCamelCase] =
        (giftTotals[giftNameInCamelCase] || 0) + answer;
    }
  }

  return giftTotals;
};

export async function action({ request }) {
  const body = await request.formData();

  const formData = {};
  for (const entry of body.entries()) {
    formData[entry[0]] = entry[1];
  }

  const giftTotals = await calculateGiftTotals(formData);
  console.log("Gift totals:", giftTotals);

  return redirect("/results");
}

export const loader = async ({ request }: LoaderArgs) => {
  const questions = await getQuestions();
  const user = await getUser(request);

  return json({
    questions,
    user,
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
