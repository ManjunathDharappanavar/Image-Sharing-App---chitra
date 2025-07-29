const express = require('express');
const router = express.Router();
const {registerUser, userLogin, deleteUser, updateUser, getUser} = require('../controllers/userController')

router.post('/register', registerUser);
router.post('/login', userLogin)
router.put('/updateuser/:userId', updateUser)
router.delete('/deleteuser/:userId', deleteUser)
router.get('/getuser/:username', getUser)

module.exports = router;