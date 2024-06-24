import crypto from 'crypto';

export default class Password {
    private constructor(private readonly value: string, private readonly salt: string) {}

    static create(plainTextPassword: string): Password {
        // if (!this.isStrongPassword(plainTextPassword)) {
        //     throw new Error('Password is too weak');
        // }
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = this.hashPassword(plainTextPassword, salt);
        return new Password(hashedPassword, salt);
    }

    private static isStrongPassword(password: string): boolean {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    private static hashPassword(password: string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    }

    validate(plainTextPassword: string): boolean {
        const hashedPassword = Password.hashPassword(plainTextPassword, this.salt);
        return this.value === hashedPassword;
    }

    get(): string {
        return this.value;
    }
}
