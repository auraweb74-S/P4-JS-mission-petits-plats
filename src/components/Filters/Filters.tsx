import TagSelector from "@/components/TagSelector/TagSelector";
import styles from "./Filters.module.css";

type FiltersProps ={
  recipeCount: number;
}
export default function Filters({ recipeCount }: FiltersProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.selectors}>
        <TagSelector label="Ingrédients" />
        <TagSelector label="Appareils" />
        <TagSelector label="Ustensiles" />
      </div>

      <p className={styles.recipeCount}>{recipeCount} {recipeCount === 1 ? "recette" : "recettes"}</p>
    </div>
  );
}