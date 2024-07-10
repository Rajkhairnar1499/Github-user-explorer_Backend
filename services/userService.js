const axios = require("axios");
const User = require("../models/userModel");
// const apiToken = process.env.API_PASSKEY;

const findUser = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    throw error;
  }
};

const getUserFromAPI = async (username) => {
  try {
    const gitUser = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: { Authorization: `token ${apiToken}` },
      }
    );
    return gitUser.data;
  } catch (error) {
    console.error("Error fetching user from GitHub API:", error.message);
    throw new Error(
      "This username doesn't exist on Github! Please provide a correct username."
    );
  }
};

const createUserInstance = (userData) => {
  return new User({
    username: userData.login,
    id: userData.id,
    name: userData.name,
    avatar_url: userData.avatar_url,
    company: userData.company,
    location: userData.location,
    blog: userData.blog,
    bio: userData.bio,
    email: userData.email,
    public_repos: userData.public_repos,
    public_gists: userData.public_gists,
    followers: userData.followers,
    following: userData.following,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
    isDeleted: userData.isDeleted,
    friends: userData.friends,
  });
};

const storeUser = async (userData) => {
  try {
    if (!userData.login || !userData.id) {
      throw new Error("Invalid user data");
    }
    const newUser = createUserInstance(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error saving user:", error.message);
    throw new Error("Error saving user to the database");
  }
};

const getMutualUsers = async (username, userId) => {
  try {
    const followersResponse = await axios.get(
      `https://api.github.com/users/${username}/followers`,
      {
        headers: { Authorization: `token ${apiToken}` },
      }
    );
    const followingResponse = await axios.get(
      `https://api.github.com/users/${username}/following`,
      {
        headers: { Authorization: `token ${apiToken}` },
      }
    );

    const followers = followersResponse.data.map((el) => el.login);
    const following = followingResponse.data.map((el) => el.login);
    const mutualUsers = followers.filter((user) => following.includes(user));

    if (mutualUsers.length === 0) {
      return { message: "No mutual followers" };
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { friends: mutualUsers } },
      { new: true }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserFromDB = async (searchData) => {
  try {
    return await User.find(searchData);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (username) => {
  try {
    return await User.findOneAndUpdate(
      { username },
      { $set: { isDeleted: true } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const updateUser = async (username, updatedData) => {
  try {
    return await User.findOneAndUpdate(
      { username },
      { $set: updatedData },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const listUsers = async (sortType, sortOrder) => {
  try {
    const sortOrderFlag = sortOrder === "asc" ? 1 : -1;
    const sortCriteria = {};
    sortCriteria[sortType] = sortOrderFlag;

    const users = await User.find({}).sort(sortCriteria);

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.error("Error in listUsers:", error.message); // Debug log
    throw error;
  }
};

module.exports = {
  getUserFromAPI,
  storeUser,
  findUser,
  getMutualUsers,
  getUserFromDB,
  deleteUser,
  updateUser,
  listUsers,
};
