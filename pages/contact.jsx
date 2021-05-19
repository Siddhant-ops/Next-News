import React from "react";
import Nav from "../Components/Nav";
import styles from "../styles/Home.module.scss";

const contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <Nav />
      Contact
    </div>
  );
};

export default contact;
