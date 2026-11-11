import styles from "./Footer.module.css";

type FooterProps = {
  fluid?: boolean;
};

export default function Footer({
  fluid = false,
}: FooterProps) {
  return (
    <footer
      className={`${styles.footer} ${
        fluid ? styles.fluid : ""
      }`}
    >
      <small className={styles.copyright}>
        Copyright © 2025 - Les Petits Plats
      </small>
    </footer>
  );
}