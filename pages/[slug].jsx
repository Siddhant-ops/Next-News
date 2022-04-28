import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Nav from "../Components/Nav";
import { countries } from "../Components/Helper";
import styles from "../styles/News.module.scss";

const Page = ({ response }) => {
  const router = useRouter();

  const { slug } = router.query;

  const renderPosts = (postsData) => {
    return (
      <div className={styles.mainContainer}>
        {postsData?.articles.map((post) => (
          <div key={post.title} className={styles.main}>
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
    );
  };

  if (response && typeof response === "object") {
    return (
      <div className={styles.container}>
        <Head>
          <title>The Blog : News - {slug.toUpperCase()}</title>
        </Head>
        <div className={styles.box}></div>
        <Nav />
        <div id="linkRow" className={styles.link_row}>
          {Object.keys(countries).map((key, index) => {
            return (
              <Link href={`/${key}`} key={index}>
                <a>
                  <h5 className={key === slug ? styles.activeCountry : ""}>
                    {countries[key]}
                  </h5>
                </a>
              </Link>
            );
          })}
        </div>
        <div id="cont" className={styles.horizontalDiv}>
          <div id="blocks" className={styles.bigBlocks}>
            <h1>Top Headlines</h1>
            <hr />
            {renderPosts(response?.top)}
          </div>
          <div id="blocks" className={styles.smallBlocks}>
            <h3>business</h3>
            <hr />
            {renderPosts(response?.business)}
          </div>
          <div id="blocks" className={styles.smallBlocks}>
            <h3>technology</h3>
            <hr />
            {renderPosts(response?.science)}
          </div>
          <div id="blocks" className={styles.bigBlocks}>
            <h3>science</h3>
            <hr />
            {renderPosts(response?.sports)}
          </div>
          <div id="blocks" className={styles.bigBlocks}>
            <h3>sports</h3>
            <hr />
            {renderPosts(response?.technology)}
          </div>
          <div id="blocks" className={styles.smallBlocks}>
            <h3>health</h3>
            <hr />
            {renderPosts(response?.health)}
          </div>

          <div id="blocks" className={styles.smallBlocks}>
            <h3>entertainment</h3>
            <hr />
            {renderPosts(response?.entertainment)}
          </div>
        </div>
      </div>
    );
  }
};

export default Page;

export const getServerSideProps = async (pageContext) => {
  const countryCode = pageContext.query?.slug;

  const secretKey = process.env.SECRET_API_KEY;

  const apiResponseGeneral = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseBusiness = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=business&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseScience = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=science&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseSports = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=sports&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseTechnology = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=technology&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseHealth = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=health&apiKey=${secretKey}`
  ).then((res) => res.json());

  const apiResponseEntertainment = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=entertainment&apiKey=${secretKey}`
  ).then((res) => res.json());

  const response = {
    top: apiResponseGeneral,
    business: apiResponseBusiness,
    science: apiResponseScience,
    sports: apiResponseSports,
    technology: apiResponseTechnology,
    health: apiResponseHealth,
    entertainment: apiResponseEntertainment,
  };

  for (const key in response) {
    if (
      response[key]?.status === "error" ||
      response[key]?.totalResults === 0
    ) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      response,
    },
  };
};
