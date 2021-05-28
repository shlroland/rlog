import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.port || 8023,()=>{
    console.log(' Rlog Server is listening on port 8023.')
  });
}
bootstrap();
