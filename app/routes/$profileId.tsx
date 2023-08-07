import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getProfileByProfileId } from "~/models/profile.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { profileId } = params;

  try {
    const profile = await getProfileByProfileId(profileId);

    return json({ profile });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return json(
      { error: "An error occurred while fetching profile data." },
      500
    );
  }
};

export default function Profile() {
  const { profile } = useLoaderData();

  if (!profile) {
    return <div>Loading...</div>;
  }

  // Calculate the total gifts value
  const totalGifts = Object.values(profile).reduce(
    (sum, value) => sum + (typeof value === "number" ? value : 0),
    0
  );

  // Remove the unwanted keys from the profile object
  const filteredProfile = Object.fromEntries(
    Object.entries(profile).filter(
      ([key]) => !["id", "createdAt", "updatedAt", "userId"].includes(key)
    )
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gradient-to-b from-blue-900 to-blue-500 p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-3xl font-bold text-blue-800 md:text-4xl">
          Profile for: {profile.name}
        </h1>
        {/* Display other profile data here */}
        <div className="p-2">
          {Object.entries(filteredProfile).map(([key, value]) => (
            <div className="mb-2 flex items-center" key={key}>
              <div className="mr-2 w-20 text-right text-xs font-medium">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </div>
              <div className="flex h-8 flex-grow items-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400">
                <div
                  className="h-full rounded-md bg-white"
                  style={{
                    width: `${
                      typeof value === "number" ? (value / totalGifts) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <div className="ml-2 w-16 font-semibold">
                {typeof value === "number" ? value.toFixed(1) : "N/A"}
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/"
          className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 md:w-auto"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
