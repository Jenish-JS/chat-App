import bcrypt from "bcrypt";

const createHashKey = async (password, salt) => {
  const hashedKey = await bcrypt.hash(password, salt);

  return hashedKey;
};

const varifyHashedKey = async (password, hashedKey) => {
  const varifyKey = await bcrypt.compare(password, hashedKey);

  return varifyKey;
};

export {createHashKey,varifyHashedKey}
