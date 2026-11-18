import type {RequestHandler} from 'express';
import {z} from 'zod';


type RequestShemas ={
    body?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
}

export const validateRequest = (
    schemas: RequestShemas
): RequestHandler => {
    return (req, res, next) => {
        try{
            const validated: Record<string, unknown> = {};
            if(schemas.body){
                validated.body = schemas.body.parse(req.body);
            }
            if(schemas.query){
                validated.query = schemas.query.parse(req.query);
            }
            if(schemas.params){
                validated.params = schemas.params.parse(req.params);
            }
            res.locals.validated = validated;
            next();
        }catch(error){
            next(error);
        }

    };
};