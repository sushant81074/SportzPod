const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page</h1>`);
});

module.exports = {
  router,
};
