import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './entities/review.entity';
import { Model } from 'mongoose';
import { QuizBank } from 'src/quiz-bank/entities/quiz-bank.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(QuizBank.name) private quizBankModel: Model<QuizBank>,
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
  ) { }

  // compare answer with correct answer in quiz-bank and return score
  async compareAnswer(data: any) {

    const quizBank = await this.quizBankModel.findById(data.quizBankId);
    console.log(quizBank.answerList);
    const review = await this.reviewModel.findById(data.reviewId);

    let score = 0;
    for (let i = 0; i < quizBank.answerList.length; i++) {
      if (quizBank.answerList[i] === review.answer[i]) {
        console.log(quizBank.answerList[i], review.answer[i]);
        score++;
      }
    }
    return score;
  }




  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const review = new this.reviewModel(createReviewDto);
      return await review.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const review = await this.reviewModel.find().exec();
      return review;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findOne(id: string) {
    try {
      const review = await this.reviewModel.findById({ _id: id });
      return review;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.reviewModel.findOneAndUpdate(
        { _id: id },
        { ...updateReviewDto },
        { new: true },
      );
      return updatedReview;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedReview = await this.reviewModel.findOneAndDelete({
        _id: id,
      });
      return deletedReview;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
