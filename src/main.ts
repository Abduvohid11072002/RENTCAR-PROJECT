import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Rentcar Project')
    .setDescription('The RentCar API description')
    .setVersion('1.0')
    .addTag('Cars')
    .addBearerAuth()
    .build()
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
