import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={`/images/recipes/${recipe.image}`}
          alt={recipe.name}
          fill
          sizes="
            (max-width: 768px) calc(100vw - 40px),
            (max-width: 1100px) calc(43vw - 16px),
            (max-width: 1674px) calc(28.67vw - 32px),
            448px
          "
        />

        <time
          className={styles.time}
          dateTime={`PT${recipe.time}M`}
        >
          {recipe.time} min
        </time>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.name}</h3>

        <div className={styles.recipeDetails}>
          <h4 className={styles.sectionTitle}>Recette</h4>

          <p className={styles.description}>{recipe.description}</p>
        </div>

        <div className={styles.ingredientsDetails}>
          <h4 className={styles.sectionTitle}>Ingrédients</h4>

          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ingredient) => (
              <li
                className={styles.ingredient}
                key={`${recipe.id}-${ingredient.ingredient}`}
              >
                <p className={styles.ingredientName}>
                  {ingredient.ingredient}
                </p>

                {ingredient.quantity !== undefined && (
                  <p className={styles.ingredientQuantity}>
                    {ingredient.quantity}
                    {ingredient.unit ? ` ${ingredient.unit}` : ""}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}