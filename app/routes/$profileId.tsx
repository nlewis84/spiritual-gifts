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

  // Remove the unwanted keys from the profile object
  const filteredProfile = Object.fromEntries(
    Object.entries(profile).filter(
      ([key]) => !["id", "createdAt", "updatedAt", "userId"].includes(key)
    )
  );

  // Calculate the total gifts value and the maximum value for scaling
  const totalGifts = Object.values(filteredProfile).reduce(
    (sum, value) => sum + (typeof value === "number" ? value : 0),
    0
  );
  const maxValue = Math.max(...Object.values(filteredProfile));

  // Get the top three keys based on their values
  const topThreeKeys = Object.entries(filteredProfile)
    .sort(([, valueA], [, valueB]) => valueB - valueA)
    .slice(0, 3)
    .map(([key]) => key);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-900 to-blue-500 p-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-center text-3xl font-bold text-blue-800 md:text-4xl">
          Results:
        </h1>
        {/* Display other profile data here */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(filteredProfile).map(([key, value]) => (
            <div
              key={key}
              className={`rounded-lg px-2 pb-2 ${
                topThreeKeys.includes(key) ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center py-1">
                <div className="w-32">
                  <div className="text-sm capitalize text-gray-500">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                </div>

                <div
                  className={`ml-2 text-xl ${
                    topThreeKeys.includes(key) ? "font-bold" : ""
                  }`}
                >
                  {typeof value === "number" ? Math.round(value) : "0"}
                </div>
              </div>
              <div className="relative h-5 flex-grow overflow-hidden rounded-full bg-gray-200">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-blue-600"
                  style={{
                    width: `${
                      ((typeof value === "number" ? value : 0) / maxValue) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 w-full rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md hover:bg-blue-700 md:w-auto">
          <Link to="/">Go Back</Link>
        </div>
      </div>
    </main>
  );
}
