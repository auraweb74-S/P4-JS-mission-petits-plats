export type Ingredient = {
  ingredient: string;
  quantity?: number | string;
  unit?: string;
};

export type Recipe = {
  id: number;
  image: string;
  name: string;
  slug: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
};