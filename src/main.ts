import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformIntercpetor } from './common/interceptor/transform.interceptor';
import * as fs from 'fs'
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as http from 'http'
import * as https from 'https'
import { INestApplication } from '@nestjs/common';

const isDev = process.env.NODE_ENV === 'dev'

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('./secrets/privkey.pem'),
        cert: fs.readFileSync('./secrets/fullchain.pem'),
    };

    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    if (isDev) {
        await initSwagger(app)
    }

    // app.useGlobalFilters(new CommonExceptionFilter());
    app.useGlobalInterceptors(new TransformIntercpetor());

    await app.init();

    const httpServer = http.createServer(server).listen(80);
    const httpsServer = https.createServer(httpsOptions, server).listen(443);
}

function initSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('0.0.1')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}


bootstrap();
