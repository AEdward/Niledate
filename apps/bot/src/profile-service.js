import { prisma } from './db.js';

export async function saveProfile(profileData) {
  const telegramId = BigInt(profileData.telegramId);

  const user = await prisma.user.upsert({
    where: {
      telegramId
    },
    update: {
      telegramUsername: profileData.username || null
    },
    create: {
      telegramId,
      telegramUsername: profileData.username || null
    }
  });

  const profile = await prisma.profile.upsert({
    where: {
      userId: user.id
    },
    update: {
      name: profileData.name,
      age: profileData.age,
      gender: profileData.gender.toUpperCase(),
      city: profileData.city,
      bio: profileData.bio,
      photoFileId: profileData.photoFileId
    },
    create: {
      userId: user.id,
      name: profileData.name,
      age: profileData.age,
      gender: profileData.gender.toUpperCase(),
      city: profileData.city,
      bio: profileData.bio,
      photoFileId: profileData.photoFileId
    }
  });

  return {
    user,
    profile
  };
}
