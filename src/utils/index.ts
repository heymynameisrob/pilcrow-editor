import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function doesUrlMatch(paths: Array<string>, currentUrl: string) {
  const regexps = paths.map((path) => {
    const pattern = path.replace("*", ".*");
    return new RegExp("^" + pattern + "$");
  });

  return regexps.some((regexp) => regexp.test(currentUrl));
}

export function getInitialsFromFirstAndLastName(
  firstName: string | null,
  lastName: string | null,
) {
  if (!firstName || !lastName) return "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

export function getInitialsFromFullName(name: string | null) {
  if (!name) return "";
  const names = name.split(" ");
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
}

export function getAvatarColour(name: string) {
  const initial = name.slice(0, 1).toLowerCase();

  if (/[a-d]/i.test(initial)) return "bg-red-200 text-red-900";
  if (/[e-h]/i.test(initial)) return "bg-green-200 text-green-900";
  if (/[i-l]/i.test(initial)) return "bg-yellow-200 text-yellow-900";
  if (/[m-q]/i.test(initial)) return "bg-blue-200 text-blue-900";
  if (/[r-t]/i.test(initial)) return "bg-indigo-200 text-indigo-900";
  if (/[u-w]/i.test(initial)) return "bg-purple-200 text-purple-900";
  if (/[x-z]/i.test(initial)) return "bg-pink-200 text-pink-900";

  return "bg-gray-200 text-gray-900";
}

export function pluarise(string: string, data: any) {
  return data.length > 1 ? `${string}s` : string;
}

export function truncateString(string: string, length: number) {
  if (string.length <= length) return string;
  return string.slice(0, length) + "...";
}

export function createSlug(string: string | null) {
  if (!string) return "";
  const slug = string.toLowerCase().replace(/ /g, "-");
  // strip out special characters, ampersands etc
  return slug.replace(/[^\w-]+/g, "");
}


export function getCookie(name: string) {
  // get the cookie with the given name
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.includes(name));
  if (!cookie) return null;
  return cookie.split("=")[1];
}

export const getRandomEmoji = () => {
  const baseEmojis = "😊🙃🤪🤓🤯😴💩👻👽🤖👾👐🖖✌️🤟🤘🤙👋🐭🦕🦖🐉";
  return baseEmojis[Math.floor(Math.random() * baseEmojis.length)];
};

export const getRandom4DigitNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const makeStringLabel = (string: string) => {
  // swap - _ and . for spaces and capitalise first letter
  return string
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
};

export const getPublicAppUrl = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Production Domain
    process?.env?.VERCEL_URL ?? // Automatically set by Vercel (for previews)
    "http://localhost:3000/";
  url = url.includes("http") ? url : `https://${url}`;
  return url;
};

export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200; // Average case.

  let textLength = content.split(" ").length; // Split by words
  if (textLength < 1) return false;

  let value = Math.ceil(textLength / wordsPerMinute);
  return value;
}

export function getTagColor(id: number) {
  const colors = [
    "bg-red-500 dark:bg-red-400",
    "bg-green-500 dark:bg-green-400",
    "bg-yellow-500 dark:bg-yellow-400",
    "bg-blue-500 dark:bg-blue-400",
    "bg-indigo-500 dark:bg-indigo-400",
    "bg-purple-500 dark:bg-purple-400",
    "bg-pink-500 dark:bg-pink-400",
    "bg-cyan-500 dark:bg-cyan-400",
    "bg-rose-500 dark:bg-rose-400",
    "bg-violet-500 dark:bg-violet-400",
  ];
  return colors[id];
}

export function checkIfStringIsActuallyJson(str: string) {
  return str.startsWith("{") && str.endsWith("}");
}

export function prepareStringForApi(text: string) {
  // Remove breaks in paragraphs (both \r\n and \n are considered)
  let processedText = text.replace(/\r?\n/g, " ");

  // Escape characters that need to be escaped in JSON strings
  processedText = processedText
    .replace(/\\/g, "\\\\") // Escape backslashes first
    .replace(/"/g, '\\"') // Escape double quotes
    .replace(/\b/g, "\\b") // Escape backspace
    .replace(/\f/g, "\\f") // Escape formfeed
    .replace(/\n/g, "\\n") // Escape new line
    .replace(/\r/g, "\\r") // Escape carriage return
    .replace(/\t/g, "\\t"); // Escape tab

  // Return the processed text
  return processedText;
}
