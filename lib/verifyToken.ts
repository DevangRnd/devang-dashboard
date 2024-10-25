import { jwtVerify } from "jose";

interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// Create a TextEncoder to convert the secret
const textEncoder = new TextEncoder();

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      textEncoder.encode(process.env.JWT_SECRET)
    );

    // Cast the payload to our DecodedToken interface
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      iat: payload.iat as number,
      exp: payload.exp as number,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
