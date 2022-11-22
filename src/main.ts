if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8001;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log('Server started on the PORT ' + PORT));
}

bootstrap();
