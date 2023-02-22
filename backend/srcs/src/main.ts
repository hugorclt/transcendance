import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path'

declare const module: any;

export class SocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions & {
    namespace?: string;
    server?: any;
    },
  ) {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: "http://localhost:3002/",
        methods: ['GET', "POST"],
      },
    });
    return server
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  
  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:3002',
    credentials: true,
  });
  app.useWebSocketAdapter(new SocketAdapter(app));

  //===== Validation Pipe to check for input errors =====
  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));

  //===== Swagger Documentation of our API =====
  const config = new DocumentBuilder()
    .setTitle('PongChampions')
    .setDescription('The PongChampions API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //===== Exception handling for prisma error code return =====
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);

  //===== Hot Reload Module =====
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();