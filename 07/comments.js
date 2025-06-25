const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`comment 서버가 http://localhost:${PORT}에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
