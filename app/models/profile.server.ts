import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveProfileDataToUser(userId: string, giftId: string, giftTotals: any): Promise<void> {
  const giftTotalsWithoutGiftId = { ...giftTotals };
  delete giftTotalsWithoutGiftId.giftId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profiles: true },
  });

  if (user) {
    const existingProfile = user.profiles.find(
      (profile) => profile.giftId === giftId
    );

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: { ...giftTotalsWithoutGiftId },
      });
    } else {
      await prisma.profile.create({
        data: {
          userId,
          giftId,
          ...giftTotalsWithoutGiftId,
        },
      });
    }
  }
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

  // Check if the gifts already exist in the database
  const existingGifts = await prisma.gift.findMany({
    where: { name: { in: gifts } },
  });

  // Create or update the gifts with the appropriate values
  for (const giftName of gifts) {
    const giftValue = giftTotals[giftName] || 0;
    const existingGift = existingGifts.find((gift) => gift.name === giftName);

    if (existingGift) {
      await prisma.gift.update({
        where: { id: existingGift.id },
        data: { Profile: { create: { [giftName.toLowerCase()]: giftValue } } },
      });
    } else {
      await prisma.gift.create({
        data: { name: giftName, Profile: { create: { [giftName.toLowerCase()]: giftValue } } },
      });
    }
  }

  // Find the newly created or updated gifts
  const updatedGifts = await prisma.gift.findMany({
    where: { name: { in: gifts } },
  });

  // Create the profile with the updated gifts
  return prisma.profile.create({
    data: {
      giftId: updatedGifts[0].id,
      ...giftTotals,
    },
  });
}
