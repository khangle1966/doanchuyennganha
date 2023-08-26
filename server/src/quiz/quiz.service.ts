import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './entities/quiz.entity';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateQuizDto: UpdateQuizDto) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async getQuizById(id: string): Promise<Quiz> {
    return this.quizModel.findById(id).exec();
  }

  async getAllQuizzes(page: number, limit: number): Promise<Quiz[]> {
    return this.quizModel
      .find()
      .skip(page * limit)
      .limit(limit)
      .exec();
  }

  async createQuiz(quizData: Quiz): Promise<Quiz> {
    const newQuiz = new this.quizModel(quizData);
    return newQuiz.save();
  }

  async updateQuiz(id: string, quizData: Quiz): Promise<Quiz> {
    return this.quizModel.findByIdAndUpdate(id, quizData, { new: true }).exec();
  }

  async deleteQuiz(id: string): Promise<any> {
    return await this.quizModel.findByIdAndDelete(id).exec();
  }
}
