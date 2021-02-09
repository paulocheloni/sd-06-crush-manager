const express = require('express');
const fs = require('fs').promises;
const path = require('path').resolve;

const app = express();
const SUCCESS = 200;

const lerArquivo = async (arquivo) => {
  const conteudoArquivo = await fs.readFile(path(__dirname, arquivo), 'utf-8');
  return conteudoArquivo;
};

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (__request, response) => {
  response.send(await lerArquivo('/crush.json'));
});

app.listen(3000, () => console.log('ouvindo na porta 3000'));
