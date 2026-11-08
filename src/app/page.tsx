import Filters from "@/components/Filters/Filters";
import Header from "@/components/Header/Header";
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

          <Filters />
        </section>
      </main>
    </>
  );
}