import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import { getQuestions } from "~/models/question.server";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function action({ request }) {
  console.log("TEST");
  const body = await request.formData();
  console.log("Form data:", body);

  const formData = {};
  for (const entry of body.entries()) {
    formData[entry[0]] = entry[1];
  }
  console.log("Parsed form data:", formData);

  return {
    redirect: "/results",
  };
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
