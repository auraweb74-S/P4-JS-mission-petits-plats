"use client";

import { useState } from "react";
import Filters from "@/components/Filters/Filters";
import RecipeGrid from "@/components/RecipeGrid/RecipeGrid";
import type {
  TagCategory,
  TagsByCategory,
} from "@/types/filters";
import type { Recipe } from "@/types/recipe";
import {
  getUniqueValues,
  normalizeText,
} from "@/utils/normalizeText";

type RecipeExplorerProps = {
  initialRecipes: Recipe[];
};

function getTagsFromRecipes(recipes: Recipe[]): TagsByCategory {
  return {
    ingredients: getUniqueValues(
      recipes.flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient),
      ),
    ),

    appliances: getUniqueValues(
      recipes.map((recipe) => recipe.appliance),
    ),

    ustensils: getUniqueValues(
      recipes.flatMap((recipe) => recipe.ustensils),
    ),
  };
}

function recipeMatchesTags(
  recipe: Recipe,
  selectedTags: TagsByCategory,
) {
  const matchesIngredients = selectedTags.ingredients.every(
    (selectedIngredient) =>
      recipe.ingredients.some(
        (ingredient) =>
          normalizeText(ingredient.ingredient) ===
          normalizeText(selectedIngredient),
      ),
  );

  const matchesAppliances = selectedTags.appliances.every(
    (selectedAppliance) =>
      normalizeText(recipe.appliance) ===
      normalizeText(selectedAppliance),
  );

  const matchesUstensils = selectedTags.ustensils.every(
    (selectedUstensil) =>
      recipe.ustensils.some(
        (ustensil) =>
          normalizeText(ustensil) ===
          normalizeText(selectedUstensil),
      ),
  );

  return (
    matchesIngredients &&
    matchesAppliances &&
    matchesUstensils
  );
}

function removeSelectedTags(
  availableTags: string[],
  selectedTags: string[],
) {
  const selectedNormalizedTags = new Set(
    selectedTags.map((tag) => normalizeText(tag)),
  );

  return availableTags.filter(
    (tag) => !selectedNormalizedTags.has(normalizeText(tag)),
  );
}

export default function RecipeExplorer({
  initialRecipes,
}: RecipeExplorerProps) {
  const [selectedTags, setSelectedTags] =
    useState<TagsByCategory>({
      ingredients: [],
      appliances: [],
      ustensils: [],
    });

  const filteredRecipes = initialRecipes.filter((recipe) =>
    recipeMatchesTags(recipe, selectedTags),
  );

  const tagsFromFilteredRecipes =
    getTagsFromRecipes(filteredRecipes);

  const availableTags: TagsByCategory = {
    ingredients: removeSelectedTags(
      tagsFromFilteredRecipes.ingredients,
      selectedTags.ingredients,
    ),

    appliances: removeSelectedTags(
      tagsFromFilteredRecipes.appliances,
      selectedTags.appliances,
    ),

    ustensils: removeSelectedTags(
      tagsFromFilteredRecipes.ustensils,
      selectedTags.ustensils,
    ),
  };

  function handleSelectTag(
    category: TagCategory,
    tag: string,
  ) {
    setSelectedTags((currentTags) => {
      const tagAlreadySelected = currentTags[category].some(
        (selectedTag) =>
          normalizeText(selectedTag) === normalizeText(tag),
      );

      if (tagAlreadySelected) {
        return currentTags;
      }

      return {
        ...currentTags,
        [category]: [...currentTags[category], tag],
      };
    });
  }

  function handleRemoveTag(
    category: TagCategory,
    tag: string,
  ) {
    setSelectedTags((currentTags) => ({
      ...currentTags,

      [category]: currentTags[category].filter(
        (selectedTag) =>
          normalizeText(selectedTag) !== normalizeText(tag),
      ),
    }));
  }

  return (
    <>
      <Filters
        recipeCount={filteredRecipes.length}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onSelectTag={handleSelectTag}
        onRemoveTag={handleRemoveTag}
      />

      <RecipeGrid recipes={filteredRecipes} />
    </>
  );
}