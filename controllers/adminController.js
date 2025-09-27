import { getUserById, updateUser, deleteUser, getAllUsers } from '../repositories/userRepository.js';

export const listUsers = async (req, res) => {
  const requestingUser = req.user;
  if (requestingUser.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}

export const promoteToAdmin = async (req, res) => {
  const requestingUser = req.user;
  if (requestingUser.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    await updateUser(userId, { role: 'admin' });

    res.status(200).json({ message: `User with ID ${userId} has been promoted to admin` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const demoteToUser = async (req, res) => {
  const requestingUser = req.user;
  if (requestingUser.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'user') {
      return res.status(400).json({ message: 'User is already a regular user' });
    }

    await updateUser(userId, { role: 'user' });

    res.status(200).json({ message: `User with ID ${userId} has been demoted to user` });
  } catch (err) {
    res.status(500).json({ message: 'Error demoting user' });
  }
};

export const deleteUserProfile = async (req, res) => {
  const requestingUser = req.user;
  if (requestingUser.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deleteUser(userId);

    res.status(200).json({ message: `User with ID ${userId} has been deleted` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

