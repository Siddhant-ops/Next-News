// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Sample from "../../Components/Sample.json";

export default (req, res) => {
  // if (req.method === "post") {
  //   res.status(401).send("OHH NOO, This is a post method!!!!");
  // }

  res.status(200).send(Sample);
  // res.status(200).json({ name: "John Doe" });
};
