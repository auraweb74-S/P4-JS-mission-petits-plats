"use client";

import { useId, useState } from "react";
import { normalizeText } from "@/utils/normalizeText";
import styles from "./TagSelector.module.css";

type TagSelectorProps = {
  label: string;
  options: string[];
  onSelect: (tag: string) => void;
};

export default function TagSelector({
  label,
  options,
  onSelect,
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const listboxId = useId();
  const searchInputId = `${listboxId}-search`;

  const normalizedQuery = normalizeText(query);

  const filteredOptions = options.filter((option) =>
    normalizeText(option).includes(normalizedQuery),
  );

  function handleSelect(option: string) {
    onSelect(option);
    setQuery("");
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.selector} ${
          isOpen ? styles.selectorOpen : ""
        }`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span>{label}</span>

        <svg
          className={`${styles.icon} ${
            isOpen ? styles.iconOpen : ""
          }`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6L8 11L13 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchField}>
            <label
              className={styles.visuallyHidden}
              htmlFor={searchInputId}
            >
              Rechercher dans {label.toLocaleLowerCase("fr")}
            </label>

            <input
              id={searchInputId}
              className={styles.searchInput}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="6"
                stroke="currentColor"
              />

              <path
                d="M14.5 14.5L20 20"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <ul
            id={listboxId}
            className={styles.options}
            role="listbox"
            aria-label={label}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option}>
                  <button
                    className={styles.option}
                    type="button"
                    role="option"
                    aria-selected={false}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li className={styles.emptyResult}>
                Aucun résultat
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}