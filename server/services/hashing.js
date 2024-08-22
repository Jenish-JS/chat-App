import bcrypt from "bcrypt";

export const createHashKey = async (password, salt) => {
  const hashedKey = await bcrypt.hash(password, salt);

  return hashedKey;
};

export const varifyHashedKey = async (password, hashedKey) => {
  const varifyKey = await bcrypt.compare(password, hashedKey);

  return varifyKey;
};
