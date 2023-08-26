
import { Module } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `[Request] ${method} - ${originalUrl} - ${ip} - ${userAgent}`
            )

            if(req.body) {
                if(typeof req.body === 'object' && Object.keys(req.body).length > 0) { 
                    this.logger.log(`${JSON.stringify(req.body)}`)
                }
            }

            this.logger.log(
                `[Response] ${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`,
            );
        });
        next();
    }
}