import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export interface CustomRequest extends Request {
    token?: any; // Tipo pode ser ajustado conforme necessário
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Token not found');
        }
        const SECRET_KEY: Secret = process.env.SECRET_KEY as string;

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded; // Tipo assertion para informar ao TypeScript sobre a existência de 'token'

        next();
    } catch (err) {
        const errorMessage = 'Please authenticate';
        console.error(errorMessage);
        res.status(401).send(errorMessage);
    }
};
