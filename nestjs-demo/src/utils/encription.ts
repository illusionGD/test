import * as crypto from 'crypto';

export function addSalt() {
    return crypto.randomBytes(3).toString('base64');
}

export function excript(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 10000, 16, 'sha256').toString('base64');
}