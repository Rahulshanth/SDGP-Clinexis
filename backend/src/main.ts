import * as dotenv from 'dotenv'; // Add this line to load the .env file
dotenv.config();  // Load environment variables from .env file //add by rivithi
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Added by Rahul

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation pipe …
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

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
void bootstrap();
