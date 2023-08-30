import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Profile } from 'src/profile/entities/profile.entity';
import { Course } from './entities/course.entity';
import { error } from 'console';

@Controller('v1/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      const createCourse = await this.courseService.create(createCourseDto);
      console.log(createCourse);
      return createCourse;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(): Promise<Course[]> {
    try {
      const courses = await this.courseService.findAll();
      return courses;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    try {
      const course = await this.courseService.findOne(id);
      return course;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    try {
      const course = await this.courseService.update(id, updateCourseDto);
      return course;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Course> {
    try {
      const course = await this.courseService.remove(id);
      return course;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/buy')
  async buyCourse(
    @Param('id') courseId: string,
    //id == ObjectId
    @Query('uid') userId: string,
    //uid == idProfile
  ): Promise<Profile> {
    try {
      const profile = await this.courseService.buyCourse(courseId, userId);
      return profile;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/ongoing')
  async ongoingCourse(
    @Param('id') courseId: string,
    //id == ObjectId
    @Query('uid') userId: string,
    //uid == idProfile
  ): Promise<Profile> {
    try {
      const profile = await this.courseService.ongoingCourse(courseId, userId);
      if(profile) {
        const profiles = await this.courseService.removeCourse(courseId, userId);
        return profiles;
      }else{
        throw new HttpException('Course not found', 404);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id/complete')
  async completeCourse(
    @Param('id') courseId: string,
    //id == ObjectId
    @Query('uid') userId: string,
    //uid == idProfile
  ): Promise<Profile> {
    try {
      const profile = await this.courseService.completeCourse(courseId, userId);
      if(profile) {
        const profiles = await this.courseService.removeOngoingCourse(courseId, userId);
        return profiles;
      }else{
        throw new HttpException('Course not found', 404);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
