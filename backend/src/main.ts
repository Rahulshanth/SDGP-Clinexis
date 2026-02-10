import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { ValidationPipe } from '@nestjs/common'; // Added by Rahul

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Added by Rahul
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // upto this line

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
