import crypto from 'crypto';

export default class Password {
    private constructor(private readonly hashedPassword: string) {}

    static create(plainTextPassword: string, secretKey: string): Password {
        const hashedPassword = this.hashPassword(plainTextPassword, secretKey);
        return new Password(hashedPassword);
    }
    static build(plainTextPassword: string, secretKey: string): Password {
        return new Password(plainTextPassword);
    }

    private static hashPassword(plainTextPassword: string, secretKey: string): string {
        const hash = crypto.createHmac('sha256', secretKey);
        hash.update(plainTextPassword);
        return hash.digest('hex');
    }

    validate(plainTextPassword: string, secretKey: string): boolean {
        const hashedInputPassword = Password.hashPassword(plainTextPassword, secretKey);
        return this.hashedPassword === hashedInputPassword;
    }

    get(): string {
        return this.hashedPassword;
    }
}
