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
import type { Question } from "@prisma/client";
import { getQuestions, getQuestionById } from "~/models/question.server";
import {
  saveProfileDataToUser,
  saveProfileDataWithoutUser,
} from "~/models/profile.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

interface ExtendedQuestion extends Question {
  gift: {
    name: string;
    // Add any other properties from the 'gift' object if needed
  };
}

// Function to calculate gift totals from form data
const calculateGiftTotals = async (formData: Record<string, string>) => {
  const giftTotals: Record<string, number> = {};

  for (const [key, value] of Object.entries(formData)) {
    const questionId = key.replace("question_", "");
    const questionData = (await getQuestionById(
      questionId
    )) as ExtendedQuestion | null;

    if (questionData?.gift) {
      const giftName = questionData.gift.name;

      // Convert gift name to camelCase
      const giftNameInCamelCase = giftName
        .toLowerCase()
        .replace(/\/(.?)/g, (match: string, chr: string) => chr.toUpperCase());

      // Update giftTotals
      giftTotals[giftNameInCamelCase] =
        (giftTotals[giftNameInCamelCase] || 0) + parseInt(value, 10);
    }
  }

  return giftTotals;
};

export async function action({ request }: { request: Request }) {
  const body = await request.formData();
  const user = await getUser(request);

  const formData: Record<string, string> = {};

  for (const entry of body.entries()) {
    formData[entry[0]] = entry[1] as string;
  }

  const giftTotals = await calculateGiftTotals(formData);
  console.log("Gift totals:", giftTotals);
  // Save the profile data based on user login status
  let createdProfile;
  if (user) {
    createdProfile = await saveProfileDataToUser(user.id, giftTotals);
  } else {
    createdProfile = await saveProfileDataWithoutUser(giftTotals);
  }

  return redirect(createdProfile ? `/${createdProfile.id}` : "/");
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
