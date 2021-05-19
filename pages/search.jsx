import Nav from "../Components/Nav";
import styles from "../styles/Search.module.scss";
import Head from "next/head";

const search = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Blog : Search</title>
      </Head>
      <div className={styles.box}></div>
      <Nav />
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Enter text" />
      </div>
    </div>
  );
};

export default search;
