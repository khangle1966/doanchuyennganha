import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';


@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const profile = new this.profileModel(createProfileDto);
      return await profile.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<Profile> {
    try {
      const profile = await this.profileModel.findOne({ uId: id });
      return profile;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    try {
      const updatedProfile = await this.profileModel.findOneAndUpdate(
        { id: id },
        { ...updateProfileDto },
        { new: true },
      );
      return updatedProfile;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedProfile = await this.profileModel.findOneAndDelete({
        id: id,
      });
      return deletedProfile;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findAll(): Promise<Profile[]> {
    try {
      return await this.profileModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
 //how to getAllCourse
  // async getAllCourse(id: string): Promise<Profile> {
  //   try {
  //     const profile = await this.profileModel.findOne({ _id: id }).populate('completeCourse').exec();
  //     return profile;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }



  //how to getAllCourseOfProfile
   getAllCourseOfProfile(id: string):Promise<Profile> {
    try {
      const profile =  this.profileModel.findOne({ _id: id }).select('-createdAt -updatedAt -__v').populate('completeCourse','-createdAt -updatedAt -__v ').then((profile)=>{
        return profile;
      });
      return profile;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

 
  

}
