import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { recipes } from "@/data/recipes";
import styles from "./RecipeGrid.module.css";

export default function RecipeGrid() {
    return (
        <div className={styles.grid}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}