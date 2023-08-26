import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const quiz = await this.quizService.getQuizById(id);
      if (!quiz) {
        throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: quiz };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const quizzes = await this.quizService.getAllQuizzes(page, limit);
      return { statusCode: HttpStatus.OK, data: quizzes };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('create')
  async create(@Body() quizData: Quiz) {
    try {
      const newQuiz = await this.quizService.createQuiz(quizData);
      return { statusCode: HttpStatus.OK, data: newQuiz };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() quizData: Quiz) {
    try {
      const updatedQuiz = await this.quizService.updateQuiz(id, quizData);
      if (!updatedQuiz) {
        throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: updatedQuiz };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const deletedQuiz = await this.quizService.deleteQuiz(id);
      if (!deletedQuiz) {
        throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Quiz deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// @Delete(':id')
//   async delete(@Param('id') id: string) {
//     try {
//       const deletedQuiz = await this.quizService.deleteQuiz(id);
//       if (deletedQuiz === undefined) {
//         throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
//       }
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'Quiz deleted successfully',
//       };
//     } catch (error) {
//       throw new HttpException(
//         'Internal Server Error',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
