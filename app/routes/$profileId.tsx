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
  console.log(profile);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Results for Profile: {profile.id}</h1>
      {/* Display other profile data here */}
      <Link to="/">Go Back</Link>
    </div>
  );
}
