export type TagCategory =
  | "ingredients"
  | "appliances"
  | "ustensils";

export type TagsByCategory = Record<TagCategory, string[]>;