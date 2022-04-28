import axios from "axios";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("Only POST allowed here");
    res.end();
  } else {
    if (!req.body.query) {
      res.status(300).send("Request body query is empty");
      res.end();
    } else {
      const query = req.body.query;
      var pageNum = req.body.pageNum || 1;
      const secretKey = process.env.SECRET_API_KEY;
      await axios
        .get(
          `https://newsapi.org/v2/everything?q=${query}&page=${pageNum}&apiKey=${secretKey}`
        )
        .then((resp) => {
          if (resp.status === 200) {
            res.json(resp.data);
          }
        })
        .catch((err) => res.json(err));
    }
  }
};
