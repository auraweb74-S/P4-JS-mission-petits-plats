import TagSelector from "@/components/TagSelector/TagSelector";
import type {
  TagCategory,
  TagsByCategory,
} from "@/types/filters";
import styles from "./Filters.module.css";

type FiltersProps = {
  recipeCount: number;
  availableTags: TagsByCategory;
  selectedTags: TagsByCategory;
  onSelectTag: (category: TagCategory, tag: string) => void;
  onRemoveTag: (category: TagCategory, tag: string) => void;
};

export default function Filters({
  recipeCount,
  availableTags,
  selectedTags,
  onSelectTag,
  onRemoveTag,
}: FiltersProps) {
  const selectedItems: Array<{
    category: TagCategory;
    tag: string;
  }> = [
    ...selectedTags.ingredients.map((tag) => ({
      category: "ingredients" as const,
      tag,
    })),

    ...selectedTags.appliances.map((tag) => ({
      category: "appliances" as const,
      tag,
    })),

    ...selectedTags.ustensils.map((tag) => ({
      category: "ustensils" as const,
      tag,
    })),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.selectors}>
          <TagSelector
            label="Ingrédients"
            options={availableTags.ingredients}
            onSelect={(tag) =>
              onSelectTag("ingredients", tag)
            }
          />

          <TagSelector
            label="Appareils"
            options={availableTags.appliances}
            onSelect={(tag) =>
              onSelectTag("appliances", tag)
            }
          />

          <TagSelector
            label="Ustensiles"
            options={availableTags.ustensils}
            onSelect={(tag) =>
              onSelectTag("ustensils", tag)
            }
          />
        </div>

        <p className={styles.recipeCount}>
          {recipeCount}{" "}
          {recipeCount === 1 ? "recette" : "recettes"}
        </p>
      </div>

      {selectedItems.length > 0 && (
        <ul
          className={styles.selectedTags}
          aria-label="Filtres sélectionnés"
        >
          {selectedItems.map(({ category, tag }) => (
            <li key={`${category}-${tag}`}>
              <button
                className={styles.selectedTag}
                type="button"
                onClick={() => onRemoveTag(category, tag)}
                aria-label={`Supprimer le filtre ${tag}`}
              >
                <span>{tag}</span>

                <svg
                  className={styles.removeIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}