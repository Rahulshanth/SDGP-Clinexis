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

  const port = process.env.PORT || 5001;
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
