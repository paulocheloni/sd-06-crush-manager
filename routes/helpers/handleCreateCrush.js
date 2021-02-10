const fs = require('fs');
const { schema } = require('../../schemas/index');
const handleAuthorization = require('../../authorization/handleAuthorization');
const validateDate = require('../../validations/validateDate');

const handleValidationSucessfull = ({ body }, res) => {
  const jsonData = fs.readFileSync('./crush.json', 'utf8');
  const readData = JSON.parse(jsonData);
  const id = readData.length + 1;
  res.status(201).json({ id, ...body });
  readData.push({ id, ...body });
  console.log(readData);
  fs.writeFileSync('./crush.json', JSON.stringify(readData), 'utf8');
};

async function handleCreateCrush(req, res) {
  // try {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  try {
    const auth = handleAuthorization(authorization);
    if (!auth.valid) throw new Error(auth.message);
  } catch (err) {
    res.status(401).json({ message: err.message });
    return;
  }

  try {
    const validatedDate = validateDate(req.body.date);
    if (!validatedDate.valid) throw new Error(validatedDate.message);
    await schema.validate({ name, age, date });
    handleValidationSucessfull(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = handleCreateCrush;
