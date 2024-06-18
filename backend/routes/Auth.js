const express = require('express');
const { register, login , currentUser } = require('../controllers/Authentication');

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/current-user', currentUser);

module.exports = authRouter;