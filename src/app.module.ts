import { Module } from '@nestjs/common';
import { AuthModule } from './auth/Auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, PrismaModule, BookmarkModule],
})
export class AppModule {}
