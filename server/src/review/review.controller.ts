import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('v1/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const createReview = this.reviewService.create(createReviewDto);
      return createReview;
    }
    catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const review = await this.reviewService.findAll();
      return review;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const review = await this.reviewService.findOne(id);
      return review;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.reviewService.update(id, updateReviewDto);
      return review;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const review = await this.reviewService.remove(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}
