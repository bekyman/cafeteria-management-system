import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export const hashPassword = (plainTextPassword) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(plainTextPassword, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (plainTextPassword, storedPasswordHash) => {
  if (!storedPasswordHash || !storedPasswordHash.includes(":")) {
    return false;
  }

  const [salt, originalHashHex] = storedPasswordHash.split(":");
  const currentHashHex = scryptSync(
    plainTextPassword,
    salt,
    KEY_LENGTH
  ).toString("hex");

  return timingSafeEqual(
    Buffer.from(currentHashHex, "hex"),
    Buffer.from(originalHashHex, "hex")
  );
};
