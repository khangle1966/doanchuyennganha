import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Lesson> {
    return this.lessonsService.getById(id);
  }

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto){
    try {
      const createdLesson = await this.lessonsService.create(createLessonDto);
      return { message: 'Lesson created successfully', lesson: createdLesson };
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAll(): Promise<Lesson[]> {
    try {
      const lessons = await this.lessonsService.getAll();
      return lessons;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    try {
      const updatedLesson = await this.lessonsService.update(id, updateLessonDto);
      return updatedLesson;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Lesson> {
    try {
      const deletedLesson = await this.lessonsService.delete(id);
      return deletedLesson;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  
}
