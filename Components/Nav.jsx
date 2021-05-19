import React from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={styles.container}>
        <li>
          <Link href="/">
            <a
              className={
                router.asPath === "/"
                  ? `${styles.active} ${styles.linkHover}`
                  : styles.linkHover
              }
            >
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <a
              className={
                router.asPath === "/search"
                  ? `${styles.active} ${styles.linkHover}`
                  : styles.linkHover
              }
            >
              Search
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a
              className={
                router.asPath === "/contact"
                  ? `${styles.active} ${styles.linkHover}`
                  : styles.linkHover
              }
            >
              contact
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
