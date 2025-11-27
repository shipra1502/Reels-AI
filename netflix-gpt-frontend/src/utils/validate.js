export const checkValidData = (
  email,
  password,
  name = null,
  isSignUp = false
) => {
  const isNameValid = /^[a-zA-Z ]{2,}$/.test(name);
  if (isSignUp) {
    if (!isNameValid) {
      return "Name must be at least 2 characters long and contain only letters and spaces.";
    }
  }
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  if (!isNameValid) {
    return "Name must be at least 2 characters long and contain only letters and spaces.";
  }
  if (!isEmailValid) {
    return "Invalid email format.";
  }
  if (!isPasswordValid) {
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
  }
  return null;
};
