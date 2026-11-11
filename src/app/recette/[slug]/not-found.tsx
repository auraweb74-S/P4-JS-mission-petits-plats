import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import styles from "./not-found.module.css";

export default function RecipeNotFound() {
    return (
        <div className={styles.page}>
            <main className={styles.hero}>
                <Image
                    className={styles.background}
                    src="/images/ui/hero-background.jpg"
                    alt=""
                    fill
                    loading="eager"
                    sizes="
    (max-width: 768px) calc(100vw - 32px),
    (max-width: 1480px) calc(100vw - 40px),
    1440px
  "
                />

                <div className={styles.overlay} aria-hidden="true" />

                <Link className={styles.homeLink} href="/">
                    <Image
                        className={styles.logo}
                        src="/images/ui/logo.svg"
                        alt="Les Petits Plats — Retour à l’accueil"
                        width={328}
                        height={40}
                    />
                </Link>

                <div className={styles.content}>
                    <h1 className={styles.title}>404 :(</h1>

                    <p className={styles.message}>
                        La page que vous demandez est introuvable.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}