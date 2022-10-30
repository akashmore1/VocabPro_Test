const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const words = JSON.parse(
  fs.readFileSync("./dev-data/words.txt", "utf-8", () => {})
);
// console.log(words);

const createWord = (req, res) => {
  const newWord = Object.assign({}, req.body);
  words.push(newWord);

  fs.writeFile("./dev-data/words.txt", JSON.stringify(words), (err) => {
    if (err) {
      res.status(500).json({
        status: 500,
        request: "Internal Server Error",
      });
      return;
    }

    res.status(201).json({
      status: 201,
      request: "ok",
    });
  });
};

app.post("/api/v1/words", createWord);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
