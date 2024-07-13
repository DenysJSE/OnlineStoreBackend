import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaService} from "./prisma.service";

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.enableCors()

  await app.listen(PORT, () => console.log(`The server started in the port: ${PORT}`));
}
bootstrap();