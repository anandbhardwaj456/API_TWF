const express = require('express');
const router = require('./routes/router');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
router.setup(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});