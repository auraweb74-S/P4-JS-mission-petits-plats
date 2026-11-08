import Image from "next/image";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/images/ui/hero-background.jpg"
        alt=""
        fill
        sizes="100vw"
        preload
        className={styles.background}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <Image
        src="/images/ui/logo.svg"
        alt="Les Petits Plats"
        width={328}
        height={40}
        className={styles.logo}
      />

      <div className={styles.content}>
        <h1 className={styles.title}>
          Découvrez nos recettes du quotidien, simples et délicieuses
        </h1>

        <SearchBar />
      </div>
    </header>
  );
}