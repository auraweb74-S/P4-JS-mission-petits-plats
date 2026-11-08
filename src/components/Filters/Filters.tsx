import TagSelector from "@/components/TagSelector/TagSelector";
import styles from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={styles.filters}>
      <div className={styles.selectors}>
        <TagSelector label="Ingrédients" />
        <TagSelector label="Appareils" />
        <TagSelector label="Ustensiles" />
      </div>

      <p className={styles.recipeCount}>50 recettes</p>
    </div>
  );
}