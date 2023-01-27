const {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
} = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users.length) res.status(200).send(users);
    else res.status(404).json({ msg: "Users not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (user) res.status(200).send(user);
    else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await deleteAllUsers();

    if (deletedUsers.deletedCount) res.status(202).send(deletedUsers);
    else res.status(404).json({ msg: "Users not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);

    if (deletedUser) res.status(202).send(deletedUser);
    else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUsers,
  deleteUser,
};
