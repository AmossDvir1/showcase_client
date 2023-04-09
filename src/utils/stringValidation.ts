/**
 * Checks whether a username is valid according to the following criteria:
 * The username must be between 4 and 20 characters in length and can only contain
 * alphanumeric characters (letters and numbers) and underscores.
 *
 * @param username The username to validate.
 * @returns True if the username is valid, false otherwise.
 */
export const validateUsername = (username: string | undefined): boolean => {
  const regex: RegExp = /^[a-zA-Z0-9_]{2,20}$/;
  return username ? regex.test(username) : false;
};

/**
 * Checks whether an email address is valid according to the following criteria:
 * The email address must contain one or more characters followed by an @ symbol,
 * followed by one or more characters separated by dots, and ending with a two- to four-letter
 * alphabetic code (e.g. com, org, edu, gov, etc.).
 *
 * @param email The email address to validate.
 * @returns True if the email address is valid, false otherwise.
 */
export const validateEmail = (email: string | undefined): boolean => {
  const regex: RegExp = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return email ? regex.test(email) : false;
};

/**
 * Checks whether a password is valid according to a specified set of criteria.
 * The password must contain at least 1 lowercase letter, 1 uppercase letter,
 * 1 digit, 1 special character from @$!%*?&, and must be at least 8 characters long.
 *
 * @param password The password to validate.
 * @returns True if the password is valid, false otherwise.
 */
export const validatePassword = (password: string | undefined): boolean => {
  const regex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return password ? regex.test(password) : false;
};
