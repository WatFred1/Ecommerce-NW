import type {Response} from 'express';

export function successResponse<T>(
    res: Response,
    data: T,
    statusCode = 200,
    message = "Operacion exitosa"
): Response {
    return res.status(statusCode).json({
        success: true,
        requestId: res.req.id,
        message,
        data,
    });
}

export function noContentResponse(
    res: Response
): Response {
    return res.status(204).send();
}