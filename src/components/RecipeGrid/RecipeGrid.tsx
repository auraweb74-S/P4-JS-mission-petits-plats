import RecipeCard from "@/components/RecipeCard/RecipeCard";
import type { Recipe } from "@/types/recipe";
import styles from "./RecipeGrid.module.css";

type RecipeGridProps = {
  recipes: Recipe[];
};

export default function RecipeGrid({
  recipes,
}: RecipeGridProps) {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}