import bcrypt from "bcrypt";
export const hashPassword = async (passString: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passString, salt);
  return hashedPassword;
};
