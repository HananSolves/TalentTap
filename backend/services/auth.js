import jwt from "jsonwebtoken";

export function setUser(id, role, profileImage) {
  return jwt.sign(
    { id: id, role: role, profileImage: profileImage },
    process.env.JWTSECRETKEY
  );
}

export function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWTSECRETKEY);
  } catch (error) {
    console.error("Failed to verify token:", error);
    return null;
  }
}
