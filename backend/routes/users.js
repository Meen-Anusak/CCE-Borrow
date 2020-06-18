const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

/* GET users listing. */
router.get('/')

router.post('/', user_controller.addUser)

module.exports = router;