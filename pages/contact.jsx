import React from "react";
import Image from "next/image";
import Nav from "../Components/Nav";
import styles from "../styles/contact.module.scss";

const contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <Nav />
      <div className="photoBox">
      </div>
    </div>
  );
};

export default contact;
