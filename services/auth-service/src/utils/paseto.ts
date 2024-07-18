import { PasetoToken } from 'paseto';

export const generatePasetoToken = (user: any): string => {
  const pasetoToken = new PasetoToken({
    userId: user.id,
    expiresIn: '1h',
  });

  return pasetoToken.toString();
};

export const verifyPasetoToken = (token: string): any => {
  const pasetoToken = PasetoToken.fromString(token);
  return pasetoToken.verify();
};
