const express = require('express');
const fs = require('fs');
const crush = require('./crush.json');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const crushFile = fs.readFileSync(crush, 'utf-8');
  if (!crushFile) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(crushFile));
});
app.listen(3000);
