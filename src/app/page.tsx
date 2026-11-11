import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import RecipeExplorer from "@/components/RecipeExplorer/RecipeExplorer";
import { recipes } from "@/data/recipes";
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

          <RecipeExplorer initialRecipes={recipes} />
        </section>
      </main>

      <Footer fluid />
    </>
  );
}