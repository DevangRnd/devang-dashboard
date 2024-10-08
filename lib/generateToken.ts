import jwt from "jsonwebtoken";

export const generateToken = (userId: string, email: string) => {
  return jwt.sign(
    { id: userId, email }, // Payload
    process.env.JWT_SECRET!, // Secret key (make sure it's stored securely)
    { expiresIn: "24h" } // Token expires in 24 hours
  );
};
