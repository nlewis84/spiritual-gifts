import type { Profile } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProfileData {
  gift: { connect: { id: string } };
  user: { connect: { id: string } };
}

export async function saveProfileDataToUser(userId: string, giftId: any): Promise<void> {
  // Check if the gifts already exist in the database
  const gifts = [
    "Leadership",
    "Administration",
    "Teaching",
    "Knowledge",
    "Wisdom",
    "Prophecy",
    "Discernment",
    "Exhortation",
    "Shepherding",
    "Faith",
    "Evangelism",
    "Apostleship",
    "Service",
    "Mercy",
    "Giving",
    "Hospitality",
  ];  

  const existingGifts = await prisma.gift.findMany({
    where: { name: { in: gifts } },
  });

  const giftUpdates = [];
  for (const giftName of gifts) {
    const existingGift = existingGifts.find((gift) => gift.name === giftName);

    if (existingGift) {
      giftUpdates.push(
        prisma.gift.update({
          where: { id: existingGift.id },
          data: { [giftName.toLowerCase()]: 0 },
        })
      );
    } else {
      giftUpdates.push(
        prisma.gift.create({
          data: { name: giftName, [giftName.toLowerCase()]: 0 },
        })
      );
    }
  }

  const updatedGifts = await Promise.all(giftUpdates);

  // Create the profile with the updated gifts
  const profileData: ProfileData = {
    gift: { connect: { id: updatedGifts[0].id } },
    user: { connect: { id: userId } },
  };

  await prisma.profile.create({
    data: profileData,
  });
}


export async function saveProfileDataWithoutUser(giftTotals: any) {
  console.log(giftTotals);

  // Extract the gift values from the giftTotals object
  const gifts = [
    "Leadership",
    "Administration",
    "Teaching",
    "Knowledge",
    "Wisdom",
    "Prophecy",
    "Discernment",
    "Exhortation",
    "Shepherding",
    "Faith",
    "Evangelism",
    "Apostleship",
    "Service",
    "Mercy",
    "Giving",
    "Hospitality",
  ];  

  // Find the newly created or updated gifts again
  const updatedGifts = await prisma.gift.findMany({
    where: { name: { in: gifts } },
  });

  // Create the profile data with the updated gifts
  const profileData = {
    ...giftTotals,
    giftId: updatedGifts[0].id,
  };

  // Exclude the gift values and giftId from the profile data
  delete profileData.gifts;
  delete profileData.giftId;

  // Create the profile with the updated gifts
  const createdProfile = await prisma.profile.create({
    data: profileData,
  });

  // Return the entire created profile object
  return createdProfile;
}

export async function getProfileByProfileId(profileId: string): Promise<Profile | null> {
  const profile = await prisma.profile.findUnique({
    where: { id: profileId },
  });

  return profile;
}