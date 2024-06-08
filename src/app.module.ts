import { Module } from '@nestjs/common';
import { MemberModule } from './modules/member/member.module';
import { BookModule } from './modules/book/book.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MemberModule,
    BookModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      // Validation formatting response
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
