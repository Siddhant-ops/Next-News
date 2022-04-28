import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Nav from "../Components/Nav";
import { countries } from "../Components/Helper";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Blog : Home</title>
      </Head>
      <div className={styles.box}></div>
      <Nav />
      <div id="linkRow" className={styles.link_row}>
        {Object.keys(countries).map((key, index) => {
          return (
            <Link href={`/${key}`} key={index}>
              <a>
                <h5>{countries[key]}</h5>
              </a>
            </Link>
          );
        })}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.introImage}>
          <Image
            src="/Images/Home/News App.png"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.introText}>
          <h2>
            Yoooo,
            <br />
            This is cool News
            <br />
            WebApp.
          </h2>
          <h5>Click on Countries to check their news</h5>
        </div>
      </div>
    </div>
  );
}
