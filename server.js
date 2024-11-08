const app = require("./src/app.js");
const port = 3001;

const { db } = require("./db/connection");

app.listen(port, () => {
  db.sync();
  console.log(`Example app listening on port ${port}`);
});
