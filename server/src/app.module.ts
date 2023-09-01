/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(databaseConfig().database.host),
    AuthModule,
    UserModule,
    ProfileModule,
    LessonModule,
    CourseModule,
    QuizBankModule,
    QuizModule,
    QuestionModule,
    ReviewModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
