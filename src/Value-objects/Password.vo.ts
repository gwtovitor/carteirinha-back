import crypto from 'crypto';

export default class Password {
    private constructor(private readonly hashedPassword: string) {}

    static create(plainTextPassword: string, secretKey: string): Password {
        // Validação da senha
        if (!this.isValidPassword(plainTextPassword)) {
            throw new Error('Invalid password');
        }

        const hashedPassword = this.hashPassword(plainTextPassword, secretKey);
        return new Password(hashedPassword);
    }

    static build(hashedPassword: string, secretKey: string): Password {
        return new Password(hashedPassword);
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

    private static isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        return passwordRegex.test(password);
    }
}
