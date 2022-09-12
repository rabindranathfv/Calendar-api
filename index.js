const express = require('express');

const app = express();

app.listen( 4000, () => {
  console.log(`server up and runing in port 4000`);
})