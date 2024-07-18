import { V4 } from 'paseto';
import { KeyObject } from 'crypto';
import { readFileSync } from 'fs';

const key = readFileSync(process.env.PASETO_KEY || 'path/to/key.pem');

export const createToken = async (userId: string): Promise<string> => {
    return V4.sign({ userId }, KeyObject.from(key), { expiresIn: '1h' });
};

export const verifyToken = async (token: string): Promise<any> => {
    try {
        return V4.verify(token, KeyObject.from(key));
    } catch (err) {
        throw new Error('Invalid token');
    }
};
