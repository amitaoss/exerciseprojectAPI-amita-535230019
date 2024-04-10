const { User } = require('../../../models');
const { password } = require('../../../models/users-schema');
const { passwordMatched } = require('../../../utils/password');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Check if a user with the given email already exists
 * @param {string} name - Name
 * @param {string} email - User email
 * @param {string} password - Hashed pass
 * @returns {Promise}
 */
async function emailExists(email) {
  const data = await User.find({ email: email });
  if (data.length > 0) {
    return true;
  }
  return false;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

//checkk if password match
async function diffPass(oldPassword) {
  const pass = await passwordMatched(oldPassword, User.password);
  if (pass.length > 0) {
    return false;
  }
  return true;
}

async function chpassUser(id, oldPassword, newPassword, passwordConfirm) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password: newPassword,
      },
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailExists,
  diffPass,
  chpassUser,
};
