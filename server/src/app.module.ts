import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LessonsModule } from './lessons/lessons.module';
import { CourseModule } from './course/course.module';
@Module({
  imports:
    [
      MongooseModule.forRoot('mongodb+srv://tranvanhao016:hao123456@cluster0.mwofhtq.mongodb.net/'),
      AuthModule,
      UserModule,
      ProfileModule,
      LessonsModule,
      CourseModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
