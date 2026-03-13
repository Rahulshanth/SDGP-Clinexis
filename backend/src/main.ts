import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Added by Rahul

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation pipe …
<<<<<<< HEAD
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
=======
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
>>>>>>> 5a377ac37d0f3a6fb0ca674263d8dfaf11a175f9

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
bootstrap();
