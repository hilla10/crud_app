const User = require('../model/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({
      refreshToken: 0,
      password: 0,
      __v: 0,
    });
    if (!users)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: 'User ID required.' });
    const user = await User.findById(id).select({
      refreshToken: 0,
      password: 0,
      __v: 0,
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: 'User ID required.' });
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });

    await user.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, pwd } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: 'User ID required.' });
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found.' });

    user.username = username;
    user.password = hashedPwd;

    await user.save();
    return res.status(200).json({
      success: true,
      message: 'User Updated Successfully',
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser };
