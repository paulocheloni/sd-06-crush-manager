const express = require('express');
const bodyParser = require('body-parser');

const { pegandoTodosOsCrushs } = require('./controle/pegandoTodosOsCrushs');
const { pegandoCrushId } = require('./controle/pegandoPorId');
const { login } = require('./controle/login');
const { validandoCrush } = require('./controle/validandoCrush');
const { criandoCrush } = require('./controle/criandoCrush');
const { checandoToken } = require('./servicos');
const { editandoCrush } = require('./controle/editandoCrush');
const { deletandoCrush } = require('./controle/deletandoCrush');
const { procurandoCrush } = require('./controle/procurandoCrush');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.post('/login', login);

app.get('/crush', pegandoTodosOsCrushs);
app.get('/crush/search', checandoToken, procurandoCrush);
app.get('/crush/:id', pegandoCrushId);
app.post('/crush', checandoToken, validandoCrush, criandoCrush);
app.put('/crush/:id', checandoToken, validandoCrush, editandoCrush);
app.delete('/crush/:id', checandoToken, deletandoCrush);

app.listen(3000, () => {
  console.log('trabalhando');
});
