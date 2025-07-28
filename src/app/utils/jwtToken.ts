import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtSignUp = (
  payload: JwtPayload,
  secret: string,
  expiresIn: number,
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const jwtVerify = (token: string, secret: string): JwtPayload | null => {
  let decoded: JwtPayload | null = null;
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      decoded = null;
    } else {
      decoded = decodedToken as JwtPayload;
    }
  });
  return decoded;
};
