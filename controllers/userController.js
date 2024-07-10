const userService = require("../services/userService");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const apiToken = process.env.API_PASSKEY;

const fetchUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  try {
    let user = await userService.findUser(username);

    if (!user) {
      const gitUser = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: { Authorization: `token ${apiToken}` },
        }
      );
      user = await userService.storeUser(gitUser.data);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    next(error);
  }
});

const findMutualFollowers = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await userService.findUser(username);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await userService.getMutualUsers(username, user._id);

    if (result.message) {
      return res.status(200).json({ message: result.message });
    }

    res.status(200).json(result.friends);
  } catch (error) {
    console.error("Error fetching mutual followers:", error.message);
    next(error);
  }
});

const searchUsers = catchAsync(async (req, res, next) => {
  try {
    const searchData = req.query;
    const users = await userService.getUserFromDB(searchData);
    res.status(200).json({
      success: true,
      length: user.length,
      users: user,
    });
  } catch (error) {
    console.error("Error searching users:", error.message);
    next(error);
  }
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  try {
    await userService.deleteUser(username);
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    next(error);
  }
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const updatedData = req.body;
  try {
    const updatedUser = await userService.updateUser(username, updatedData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    next(error);
  }
});

// const listUsers = catchAsync(async (req, res, next) => {
//   const { sortBy, order } = req.query;
//   try {
//     const users = await userService.listUsers(sortBy, order);
//     res.status(200).json({
//       success: true,
//       length: users.length,
//       users,
//     });
//   } catch (error) {
//     console.error("Error listing users:", error.message);
//     next(error);
//   }
// });

const listUsers = catchAsync(async (req, res, next) => {
  const { sortBy, order } = req.query;
  try {
    const users = await userService.listUsers(sortBy, order);
    res.status(200).json({
      success: true,
      length: users.length,
      users,
    });
  } catch (error) {
    console.error("Error listing users:", error.message); // Debug log
    next(error);
  }
});

module.exports = {
  fetchUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
