import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CORS_ORIGIN },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // 요청에서 넘어온 자료들의 형변환
      transformOptions: {
        enableImplicitConversion: true, // 암묵적으로 타입을 변환 시켜준다.
      },
      forbidUnknownValues: true,
    }),
  );

  await app.listen(8080);
}
bootstrap();
