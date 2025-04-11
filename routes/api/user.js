const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/:id')
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteUser)
  .get(getUser);
router.route('/').get(getAllUsers);

module.exports = router;
