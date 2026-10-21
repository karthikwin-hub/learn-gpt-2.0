/**
 * A chapter to read for one knot: longer than the Bodha cards, in the order a Class 5 book would teach it.
 * Text may use [[word-id|shown word]] for a word to know; the id is one of the chapter's `words`.
 */

export interface ReadingSection {
  heading: string;
  paras: readonly string[];
  /** Id of a picture in the reading figure table. */
  figure?: string;
  caption?: string;
  didYouKnow?: string;
}

export interface WordToKnow {
  id: string;
  word: string;
  meaning: string;
}

export interface CheckQuestion {
  q: string;
  a: string;
}

export interface Chapter {
  knot: string;
  title: string;
  intro: string;
  sections: readonly ReadingSection[];
  words: readonly WordToKnow[];
  activity: { title: string; steps: readonly string[] };
  questions: readonly CheckQuestion[];
}
