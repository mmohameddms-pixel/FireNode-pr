export const handleError = (res, error) => {
  console.log("were here: ", error);
  // Check if it's a validation error (for missing fields or invalid data)
  if (error.message.includes('validation')) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  // Specific error cases
  if (error.message === 'User already exists') {
    return res.status(409).json({ message: 'Email is already in use' });
  }

  if (error.message === 'User not found') {
    return res.status(404).json({ message: 'User not found' });
  }

  if (error.message === 'Invalid password') {
    return res.status(401).json({ message: 'Invalid password' });
  }
  if (error.message === 'User is not verified, please verify your email first') {
    return res.status(401).json({ message: 'User is not verified, please verify your email first' });
  }
  if (error.message === 'Verification token is required') {
    return res.status(400).json({ message: 'Verification token is required' });
  }

  if (error.message === 'Invalid or expired token') {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Catch general unexpected errors
  console.error(error); // Log the error for debugging
  return res.status(500).json({ message: 'Internal server error' });
};
