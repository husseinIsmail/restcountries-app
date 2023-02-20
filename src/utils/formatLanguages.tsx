import { Language } from "../interfaces/Language";

export const formatLanguages = (languages: Language[]): string => {
  return languages.map((language: Language, idx) => {
    return idx > 0 ? ` ${language.name}` : `${language.name}`;
  }).toString();
};
