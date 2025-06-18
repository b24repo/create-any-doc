import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentModule } from './document/document.module';
// import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [appConfig],
      isGlobal: true,
    }),
    PrismaModule,
    DocumentModule,
  ],
})
export class AppModule {} 