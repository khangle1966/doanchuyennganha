import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './entities/review.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) { }

  // compare answer with correct answer in quiz-bank and return score
  async compareAnswer(quizBankId: string, answer: string) {

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
