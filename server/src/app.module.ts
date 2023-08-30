/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { CourseModule } from './course/course.module';
import { QuizBankModule } from './quiz-bank/quiz-bank.module';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { LessonModule } from './lesson/lesson.module';
@Module({
  imports:
    [
      MongooseModule.forRoot('mongodb+srv://tranvanhao016:hao123456@cluster0.mwofhtq.mongodb.net/'),
      AuthModule,
      UserModule,
      ProfileModule,
      CourseModule,
      QuizBankModule,
      QuizModule,
      QuestionModule,
      LessonModule
    ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
