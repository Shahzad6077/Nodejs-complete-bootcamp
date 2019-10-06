const app = require("./app");

const port = 8011;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
