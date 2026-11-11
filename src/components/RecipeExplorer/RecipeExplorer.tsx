"use client";

import { useState } from "react";
import pageStyles from "@/app/page.module.css";
import Filters from "@/components/Filters/Filters";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
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
        recipe.ingredients.map(
          (ingredient) => ingredient.ingredient,
        ),
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

function recipeMatchesSearch(
  recipe: Recipe,
  searchQuery: string,
) {
  const normalizedQuery = normalizeText(searchQuery);

  /*
   * Le cahier des charges impose de lancer la recherche
   * principale à partir de trois caractères.
   *
   * Avant trois caractères, toutes les recettes restent donc
   * disponibles.
   */
  if (normalizedQuery.length < 3) {
    return true;
  }

  /*
   * Le cahier des charges limite la recherche principale à :
   * - titre de la recette ;
   * - ingrédients ;
   * - description.
   */
  const searchableValues = [
    recipe.name,
    recipe.description,
    ...recipe.ingredients.map(
      (ingredient) => ingredient.ingredient,
    ),
  ];

  return searchableValues.some((value) =>
    normalizeText(value).includes(normalizedQuery),
  );
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
    (tag) =>
      !selectedNormalizedTags.has(normalizeText(tag)),
  );
}

export default function RecipeExplorer({
  initialRecipes,
}: RecipeExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTags, setSelectedTags] =
    useState<TagsByCategory>({
      ingredients: [],
      appliances: [],
      ustensils: [],
    });

  const normalizedSearchQuery = normalizeText(searchQuery);

  const hasActiveSearch =
    normalizedSearchQuery.length >= 3;

  /*
   * Première étape :
   * application de la recherche principale.
   *
   * Ce tableau intermédiaire permet aussi de savoir si le texte
   * saisi correspond réellement à au moins une recette avant
   * l'application des tags.
   */
  const recipesMatchingSearch = initialRecipes.filter(
    (recipe) => recipeMatchesSearch(recipe, searchQuery),
  );

  /*
   * Deuxième étape :
   * application des tags sur les résultats de la recherche.
   *
   * Les deux systèmes fonctionnent donc comme une intersection :
   * la recette doit respecter la recherche principale ET tous
   * les tags sélectionnés.
   */
  const filteredRecipes = recipesMatchingSearch.filter(
    (recipe) => recipeMatchesTags(recipe, selectedTags),
  );

  const searchHasNoResults =
    hasActiveSearch && recipesMatchingSearch.length === 0;

  /*
   * Les propositions des menus sont recalculées à partir des
   * recettes encore affichées, comme l'impose le cahier des
   * charges.
   */
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
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className={pageStyles.main}>
        <section
          className={pageStyles.recipesSection}
          aria-labelledby="recipes-title"
        >
          <h2
            id="recipes-title"
            className={pageStyles.visuallyHidden}
          >
            Liste des recettes
          </h2>

          <Filters
            recipeCount={filteredRecipes.length}
            availableTags={availableTags}
            selectedTags={selectedTags}
            onSelectTag={handleSelectTag}
            onRemoveTag={handleRemoveTag}
          />

          {filteredRecipes.length > 0 ? (
            <RecipeGrid recipes={filteredRecipes} />
          ) : (
            <p
              className={pageStyles.noResults}
              role="status"
            >
              {searchHasNoResults ? (
                <>
                  Aucune recette ne contient «{" "}
                  <strong>{searchQuery.trim()}</strong> ».
                  Vous pouvez chercher « tarte aux pommes », «
                  poisson », etc.
                </>
              ) : (
                <>
                  Aucune recette ne correspond aux filtres
                  sélectionnés.
                </>
              )}
            </p>
          )}
        </section>
      </main>

      <Footer fluid />
    </>
  );
}