const express = require('express');

const router = express.Router();

const validateUser = require('../auth/validateUser');

const allCrushs = require('../controllers/CrashAll');
const searchCrushById = require('../controllers/CrashById');
const crashToken = require('../controllers/CrashToken');
const addNewCrush = require('../controllers/CrashAdd');
const updateCrush = require('../controllers/CrashUpdate');
const deleteCrush = require('../controllers/CrashDelete');

router.get('/crush', allCrushs);
router.get('/crush/:id', searchCrushById);
router.post('/login', crashToken);
router.post('/crush', validateUser, addNewCrush);
router.put('/crush/:id', validateUser, updateCrush);
router.delete('/crush/:id', deleteCrush);

module.exports = router;
