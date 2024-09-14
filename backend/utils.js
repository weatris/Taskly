import jwt from "jsonwebtoken";
import ms from "ms";

export const generateToken = (userId, expiresIn) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn,
  });

  const expirationDate = new Date(Date.now() + ms(expiresIn));

  return { token, expirationDate };
};
