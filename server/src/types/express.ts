import { Request, Response } from 'express';

export type Express = {
    delete: (path: string, callback: (req: Request, res: Response) => void) => void;
    get: (path: string, callback: (req: Request, res: Response) => void) => void;
    listen: (port: number, callback: () => void) => void;
    post: (path: string, callback: (req: Request, res: Response) => void) => void;
    put: (path: string, callback: (req: Request, res: Response) => void) => void;
    use: (path?: string, middleware?: ()=>void) => void;
};
