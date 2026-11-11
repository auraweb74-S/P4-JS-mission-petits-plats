import RecipeExplorer from "@/components/RecipeExplorer/RecipeExplorer";
import { recipes } from "@/data/recipes";

export default function Home() {
  return <RecipeExplorer initialRecipes={recipes} />;
}