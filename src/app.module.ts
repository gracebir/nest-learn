import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    PrismaModule, 
    BookmarkModule, UserModule
  ],
  controllers: [UserController],
})
export class AppModule {}
