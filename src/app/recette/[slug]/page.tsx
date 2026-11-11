import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { recipes } from "@/data/recipes";
import styles from "./page.module.css";

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  const recipe = recipes.find(
    (currentRecipe) => currentRecipe.slug === slug,
  );

  if (!recipe) {
    return <main>Recette introuvable</main>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.headerBackground}
          src="/images/ui/hero-background.jpg"
          alt=""
          fill
          sizes="
            (max-width: 768px) calc(100vw - 32px),
            (max-width: 1480px) calc(100vw - 40px),
            1440px
          "
        />

        <div className={styles.headerOverlay} aria-hidden="true" />

        <Link className={styles.homeLink} href="/">
          <Image
            className={styles.logo}
            src="/images/ui/logo.svg"
            alt="Les Petits Plats — Retour à l’accueil"
            width={328}
            height={40}
          />
        </Link>
      </header>

      <main className={styles.main}>
        <article className={styles.recipe}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={`/images/recipes/${recipe.image}`}
              alt={recipe.name}
              fill
              preload
              sizes="
                (max-width: 660px) calc(100vw - 40px),
                (max-width: 900px) 620px,
                (max-width: 1488px) calc(43vw - 32px),
                608px
              "
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{recipe.name}</h1>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Temps de préparation
              </h2>

              <time
                className={styles.time}
                dateTime={`PT${recipe.time}M`}
              >
                {recipe.time} min
              </time>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Ingrédients</h2>

              <ul className={styles.ingredients}>
                {recipe.ingredients.map((ingredient) => (
                  <li
                    className={styles.ingredient}
                    key={`${recipe.id}-${ingredient.ingredient}`}
                  >
                    <p className={styles.itemName}>
                      {ingredient.ingredient}
                    </p>

                    {ingredient.quantity !== undefined && (
                      <p className={styles.itemQuantity}>
                        {ingredient.quantity}
                        {ingredient.unit ? ` ${ingredient.unit}` : ""}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Ustensiles nécessaires
              </h2>

              <ul className={styles.simpleList}>
                {recipe.ustensils.map((ustensil) => (
                  <li className={styles.itemName} key={ustensil}>
                    {ustensil}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Appareil nécessaire
              </h2>

              <p className={styles.itemName}>{recipe.appliance}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Recette</h2>

              <p className={styles.description}>
                {recipe.description}
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}