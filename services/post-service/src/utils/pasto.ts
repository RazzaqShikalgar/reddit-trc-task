import { PastoToken } from 'pasto';

export const generatePastoToken = (user: any): string => {
  const pastoToken = new PastoToken({
    userId: user.id,
    expiresIn: '1h',
  });

  return pastoToken.toString();
};

export const verifyPastoToken = (token: string): any => {
  const pastoToken = PastoToken.fromString(token);
  return pastoToken.verify();
};