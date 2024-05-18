// Soli Deo Gloria
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import env from 'config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ioasys Journey API')
    .setDescription('The Ioasys Journey API')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = env().app.port || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: ${PORT}`);
}

bootstrap();
