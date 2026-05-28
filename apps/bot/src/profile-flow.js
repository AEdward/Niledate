import { saveProfile } from './profile-service.js';

const sessions = new Map();
const profiles = new Map();

const STEPS = {
  NAME: 'NAME',
  AGE: 'AGE',
  GENDER: 'GENDER',
  CITY: 'CITY',
  BIO: 'BIO',
  PHOTO: 'PHOTO'
};

export function startProfileFlow(ctx) {
  const userId = ctx.from.id;

  sessions.set(userId, {
    step: STEPS.NAME,
    profile: {
      telegramId: userId,
      username: ctx.from.username || null
    }
  });

  return ctx.reply('Let’s create your NileDate profile 💙\n\nFirst, what is your name?');
}

export function hasActiveProfileFlow(ctx) {
  return sessions.has(ctx.from.id);
}

export async function handleProfileText(ctx) {
  const userId = ctx.from.id;
  const session = sessions.get(userId);

  if (!session) return false;

  const text = ctx.message.text.trim();

  if (text === 'Cancel') {
    sessions.delete(userId);
    await ctx.reply('Profile creation cancelled.');
    return true;
  }

  if (session.step === STEPS.NAME) {
    if (text.length < 2) {
      await ctx.reply('Please enter a real name with at least 2 letters.');
      return true;
    }

    session.profile.name = text;
    session.step = STEPS.AGE;
    await ctx.reply('Great. How old are you?');
    return true;
  }

  if (session.step === STEPS.AGE) {
    const age = Number(text);

    if (!Number.isInteger(age) || age < 18 || age > 80) {
      await ctx.reply('Please enter a valid age between 18 and 80.');
      return true;
    }

    session.profile.age = age;
    session.step = STEPS.GENDER;
    await ctx.reply('What is your gender?\n\nReply with: Male or Female');
    return true;
  }

  if (session.step === STEPS.GENDER) {
    const gender = text.toLowerCase();

    if (!['male', 'female'].includes(gender)) {
      await ctx.reply('Please reply with Male or Female.');
      return true;
    }

    session.profile.gender = gender;
    session.step = STEPS.CITY;
    await ctx.reply('Which city are you in? Example: Addis Ababa');
    return true;
  }

  if (session.step === STEPS.CITY) {
    if (text.length < 2) {
      await ctx.reply('Please enter your city name.');
      return true;
    }

    session.profile.city = text;
    session.step = STEPS.BIO;
    await ctx.reply('Write a short bio about yourself. Keep it simple and real.');
    return true;
  }

  if (session.step === STEPS.BIO) {
    if (text.length < 10) {
      await ctx.reply('Please write at least 10 characters for your bio.');
      return true;
    }

    session.profile.bio = text;
    session.step = STEPS.PHOTO;
    await ctx.reply('Almost done. Send one clear photo of yourself.');
    return true;
  }

  return false;
}

export async function handleProfilePhoto(ctx) {
  const userId = ctx.from.id;
  const session = sessions.get(userId);

  if (!session || session.step !== STEPS.PHOTO) return false;

  const photos = ctx.message.photo;
  const bestPhoto = photos[photos.length - 1];

  session.profile.photoFileId = bestPhoto.file_id;
  
  await saveProfile(session.profile);
  
  profiles.set(userId, session.profile);
  sessions.delete(userId);

  await ctx.reply(formatProfilePreview(session.profile));
  await ctx.reply('Your profile is ready ✅\n\nNext: we’ll connect this to the database and start building swipe/match logic.');

  return true;
}

export function getProfile(userId) {
  return profiles.get(userId);
}

function formatProfilePreview(profile) {
  return `Profile Preview 💙\n\nName: ${profile.name}\nAge: ${profile.age}\nGender: ${profile.gender}\nCity: ${profile.city}\nBio: ${profile.bio}`;
}
