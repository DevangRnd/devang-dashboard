import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
