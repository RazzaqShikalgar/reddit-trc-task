import { randomInt } from 'crypto';

const otpCache: { [key: string]: { otp: string; expiresAt: number } } = {};

export const generateOTP = (email: string): string => {
    const otp = randomInt(100000, 999999).toString();
    otpCache[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP expires in 5 minutes
    return otp;
};

export const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    const cachedOTP = otpCache[email];
    if (!cachedOTP || cachedOTP.otp !== otp || cachedOTP.expiresAt < Date.now()) {
        return false;
    }
    delete otpCache[email];
    return true;
};
