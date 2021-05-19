import Nav from "../Components/Nav";
import styles from "../styles/Home.module.scss";
import Head from "next/head";

export default function Home({ response }) {
  if (response && typeof response === "object") {
    return (
      <div className={styles.container}>
        <Head>
          <title>The Blog : Home</title>
        </Head>
        <div className={styles.box}></div>
        <Nav />
        <h2 className={styles.topHeadlines}>Top Headlines of India</h2>
        <hr />
        <div className={styles.mainContainer}>
          {response.articles.map((post) => (
            <div key={post.title} className={styles.main}>
              <a href={post.url}>
                <h4>{post.title}</h4>
              </a>
              <small>{post.description}</small>
              <div className={styles.imgContainer}>
                <img src={post.urlToImage} alt="" />
              </div>
              <p>
                {post.content}.{" "}
                <a href={post.url}>
                  <span>Click to read more.</span>
                </a>
              </p>
              <div className={styles.postFooter}>
                {post.author && <small>Author : {post.author}</small>}
                {post.source.name && <small>Source : {post.source.name}</small>}
                {post.publishedAt && (
                  <small>
                    Published : {new Date(post.publishedAt).toDateString()}
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}

export const getServerSideProps = async (pageContext) => {
  // const apiKey = process.env.SECRET_API_KEY;

  // const apiResponse = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
  // );

  const apiResponse = await fetch("http://localhost:3000/api/hello");

  const response = await apiResponse.json();

  return {
    props: {
      response,
    },
  };
};
