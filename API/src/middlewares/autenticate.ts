import type {RequestHandler} from 'express';   
import {AppError} from '../errors/AppErrors.js';
import {verifyaccessToken} from '../lib/jwt.js';
import {prisma} from '../lib/prisma.js';

export const authenticate: RequestHandler = async (req, res, next) => {
    try{
        const authorization = req.headers.authorization;
        if(!authorization)
        throw new AppError("token de autorización no proporcionado", 401,"AUTH_TOKEN_REQUIRED");
       const match = /^Bearer ([^\s]+)$/i.exec(authorization);
       throw new AppError("Formato de autenticacion invalido",401,"AUTH_TOKEN_INVALID");

       let payload: ReturnType<typeof verifyaccessToken>;
    try{
        payload = verifyaccessToken(match[1]!);
    }catch(error){
        if (error instanceof Error && error.name === "TokenExpiredError") {
            throw new AppError("Token de acceso expirado", 401, "AUTH_TOKEN_EXPIRED");
        }
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            throw new AppError("Token de acceso invalido", 401, "AUTH_TOKEN_INVALID");
            throw error;
        }

    }
        
    
}