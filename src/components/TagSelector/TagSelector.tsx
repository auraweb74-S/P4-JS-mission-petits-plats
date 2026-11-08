import styles from "./TagSelector.module.css";

type TagSelectorProps = {
  label: string;
};

export default function TagSelector({ label }: TagSelectorProps) {
  return (
    <button
      className={styles.selector}
      type="button"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span>{label}</span>

      <svg
        className={styles.icon}
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
  );
}