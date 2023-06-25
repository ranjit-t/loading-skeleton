const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/addNewQuote", (req, res) => {
  const { name, quotes } = req.body;

  const dataPath = path.join(__dirname, "data.json");
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]");
  }

  const jsonData = fs.readFileSync(dataPath);
  const data = JSON.parse(jsonData);

  data.push({ name, quotes });
  fs.writeFileSync(dataPath, JSON.stringify(data));

  res.send("added");
});

app.get("/getdata", (req, res) => {
  const dataPath = path.join(__dirname, "data.json");
  if (fs.existsSync(dataPath)) {
    try {
      const jsonData = fs.readFileSync(dataPath);
      const data = JSON.parse(jsonData);
      res.json(data);
    } catch (error) {
      console.log("Error:", error.message);
      res.json([]);
    }
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
