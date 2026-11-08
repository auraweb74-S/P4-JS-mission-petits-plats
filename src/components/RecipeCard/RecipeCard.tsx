import Image from "next/image";
import styles from "./RecipeCard.module.css";

export default function RecipeCard() {
    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    className={styles.image}
                    src="/images/recipes/Recette01.jpg"
                    alt="Limonade de Coco"
                    fill
                    sizes="
                (max-width: 768px) calc(100vw - 40px),
                (max-width: 1100px) calc(43vw - 16px),
                (max-width: 1674px) calc(28.67vw - 32px),
                448px
                "
                />

                <time className={styles.time} dateTime="PT10M">
                    10 min
                </time>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>Limonade de Coco</h3>

                <div className={styles.recipeDetails}>
                    <h4 className={styles.sectionTitle}>Recette</h4>

                    <p className={styles.description}>
                        Mettre les glaçons à votre goût dans le blender, ajouter le lait,
                        la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu’à
                        avoir la consistance désirée.
                    </p>
                </div>

                <div className={styles.ingredientsDetails}>
                    <h4 className={styles.sectionTitle}>Ingrédients</h4>

                    <ul className={styles.ingredients}>
                        <li className={styles.ingredient}>
                            <p className={styles.ingredientName}>Lait de coco</p>
                            <p className={styles.ingredientQuantity}>400 ml</p>
                        </li>

                        <li className={styles.ingredient}>
                            <p className={styles.ingredientName}>Jus de citron</p>
                            <p className={styles.ingredientQuantity}>2</p>
                        </li>

                        <li className={styles.ingredient}>
                            <p className={styles.ingredientName}>Crème de coco</p>
                            <p className={styles.ingredientQuantity}>
                                2 cuillères à soupe
                            </p>
                        </li>

                        <li className={styles.ingredient}>
                            <p className={styles.ingredientName}>Sucre</p>
                            <p className={styles.ingredientQuantity}>30 grammes</p>
                        </li>

                        <li className={styles.ingredient}>
                            <p className={styles.ingredientName}>Glaçons</p>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
}