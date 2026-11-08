import styles from "./SearchBar.module.css";

export default function SearchBar() {
    return (
        <form
            className={styles.searchBar}
            role="search"
            aria-label="Recherche de recettes"
        >
            <label className={styles.visuallyHidden} htmlFor="recipe-search">
                Rechercher une recette ou un ingrédient
            </label>

            <input
                id="recipe-search"
                className={styles.input}
                type="search"
                name="query"
                placeholder="Rechercher une recette, un ingrédient, ..."
            />

            <button
                className={styles.button}
                type="submit"
                aria-label="Lancer la recherche"
            >
                <svg
                    className={styles.icon}
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="13.5"
                        cy="13.5"
                        r="8.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />

                    <path
                        d="M20 20L27.5 27.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </form>
    );
}