import { useState } from "react";
import Nav from "../Components/Nav";
import styles from "../styles/Search.module.scss";
import Head from "next/head";
import axios from "axios";

const Search = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [fetchedData, setFetchedData] = useState(null);

  const search = () => {
    const data = {
      query: inputSearch,
    };

    axios
      .post("http://localhost:3000/api/search", data)
      .then((res) => {
        if (res.status === 200) {
          setFetchedData(res.data);
        }
      })
      .catch((err) => console.log(err.response));
  };

  const randomPlaceholder = () => {
    const categories = ["politics", "games", "phones", "nature", "movies"];

    const randomCategory =
      categories[Math.round(Math.random() * (categories.length - 1) + 0)];

    return "Search " + randomCategory;
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>The Blog : Search</title>
      </Head>
      <div className={styles.box}></div>
      <Nav />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
        className={styles.inputContainer}
      >
        <input
          onChange={(e) => setInputSearch(e.target.value)}
          type="text"
          placeholder={randomPlaceholder()}
        />
        <button type="submit">Search</button>
      </form>
      <h3>Search Keywords: {inputSearch}</h3>
      <hr />
      <div className={styles.resultsContainer}>
        {fetchedData?.articles.map((post, index) => (
          <div
            key={index}
            className={styles[index % 2 == 0 ? "main1" : "main2"]}
          >
            <a href={post?.url}>
              <h4>{post?.title}</h4>
            </a>
            {post?.description && <h6>{post.description}</h6>}
            {post?.urlToImage && (
              <div className={styles.imgContainer}>
                <img src={post?.urlToImage} alt="" />
              </div>
            )}
            <p>
              {post?.content}
              <br />
              <a href={post?.url}>
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
};

export default Search;
