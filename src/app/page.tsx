import Header from "@/components/Header/Header";
import Filters from "@/components/Filters/Filters";
import { recipes } from "@/data/recipes";
import RecipeGrid from "@/components/RecipeGrid/RecipeGrid";
import styles from "./page.module.css";


export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <section
          className={styles.recipesSection}
          aria-labelledby="recipes-title"
        >
          <h2 id="recipes-title" className={styles.visuallyHidden}>
            Liste des recettes
          </h2>

          <Filters recipeCount={recipes.length} />
          <RecipeGrid />
        </section>
      </main>
    </>
  );
}