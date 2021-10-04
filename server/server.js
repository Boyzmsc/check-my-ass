const express = require("express");
const cors = require("cors");
const crawling = require("../src/services/crawling");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api", (req, res) => {
  if (
    req.body.univ !== undefined ||
    req.body.loginId !== undefined ||
    req.body.loginPwd !== undefined
  ) {
    crawling(req.body.univ, req.body.loginId, req.body.loginPwd).then(
      (data) => {
        res.json(data);
      },
    );
  } else {
    console.log("Request Data Error");
  }
});

app.listen(port, () => {
  console.log(`Express is running on ${port}`);
});
