"use client";

import type { FormEvent } from "react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onSearchChange,
}: SearchBarProps) {
  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    /*
     * La recherche est mise à jour à chaque caractère.
     * Il n'est donc pas nécessaire de recharger la page
     * lorsque le formulaire est envoyé.
     */
    event.preventDefault();
  }

  return (
    <form
      className={styles.searchBar}
      role="search"
      aria-label="Recherche de recettes"
      onSubmit={handleSubmit}
    >
      <label
        className={styles.visuallyHidden}
        htmlFor="recipe-search"
      >
        Rechercher une recette ou un ingrédient
      </label>

      <input
        id="recipe-search"
        className={styles.input}
        type="text"
        inputMode="search"
        name="query"
        value={value}
        placeholder="Rechercher une recette, un ingrédient, ..."
        autoComplete="off"
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

      {value.length > 0 && (
        <button
          className={styles.clearButton}
          type="button"
          aria-label="Effacer la recherche"
          onClick={() => onSearchChange("")}
        >
          <svg
            className={styles.clearIcon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

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