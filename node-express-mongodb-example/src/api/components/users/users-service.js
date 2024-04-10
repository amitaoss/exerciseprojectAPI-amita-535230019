const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

async function diffPass(oldPassword) {
  try {
    await usersRepository.diffPass;
  } catch (err) {
    return err;
  }
}

async function chpassUser(id, oldPassword, newPassword, passwordConfirm) {
  //find user using id
  const user = await usersRepository.getUser(id);

  //user not found
  if (!user) {
    return null;
  }

  //Hash password
  const hashedPassword = await hashPassword(newPassword);
  try {
    await usersRepository.chpassUser(
      id,
      oldPassword,
      hashedPassword,
      passwordConfirm
    );
  } catch (err) {
    return null;
  }
  return true;
}

/**
 * Check if user with the given email already exists
 * @param {string} email - User email
 * @returns {Promise<boolean>}
 */
async function emailExists(email) {
  return usersRepository.emailExists(email);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  diffPass,
  chpassUser,
  emailExists,
};
