export type Category = "card" | "keyword" | "tribe" | "cardSet";

export type Entry = {
  reading: string;
  word: string;
  category: Category;
};
