require('dotenv').config();

const app = require('./api/index.js');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
