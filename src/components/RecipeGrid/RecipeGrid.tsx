import RecipeCard from "@/components/RecipeCard/RecipeCard";
import styles from "./RecipeGrid.module.css";

export default function RecipeGrid() {
  return (
    <div className={styles.grid}>
      <RecipeCard />
    </div>
  );
}