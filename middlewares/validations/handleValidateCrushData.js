const validateDate = require('../../validations/validateDate');
const { schema } = require('../../schemas/index');

async function handleValidateCrushData(req, res, next) {
  const { name, age, date } = req.body;
  try {
    const validatedDate = validateDate(req.body.date);
    if (!validatedDate.valid) throw new Error(validatedDate.message);
    await schema.validate({ name, age, date });
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = handleValidateCrushData;
