// import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
  // en: () => import("./dictionaries/en.json").then((module) => module.default),
  // de: () => import("./dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  (dictionaries as any)[locale]?.() ?? dictionaries.ar();
