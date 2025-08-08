import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

export const jwtSignUp = (
  payload: JwtPayload,
  secret: string,
  expiresIn: number,
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const jwtVerify = (token: string, secret: string): JwtPayload | null => {
  let decoded: JwtPayload | undefined;
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      throw new AppError(401, err.name, err.message);
    } else {
      decoded = decodedToken as JwtPayload;
    }
  });
  return decoded as JwtPayload;
};
