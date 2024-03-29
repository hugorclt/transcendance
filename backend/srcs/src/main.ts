import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SocketIoAdapter } from './socket-adapter/socket-io-adapter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    allowedHeaders: ['content-type', 'Authorization'],
    origin: 'http://localhost:3002',
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  //===== Validation Pipe to check for input errors =====
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

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

  //===== Static assets directory =======
  // app.useStaticAssets(join(__dirname, '..', 'assets'), {
  //   index: false,
  //   prefix: '/assets',
  // });

  //===== Hot Reload Module =====
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
