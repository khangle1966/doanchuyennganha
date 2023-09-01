import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userData = await this.userModel.findOne({ uid: id });
      return userData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      console.log(updateUserDto);
      console.log(id);
      const updatedUser = await this.userModel.findOneAndUpdate(
        { uid: id },
        { ...updateUserDto },
        { new: true },
      );
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findOneAndRemove({ uid: id });
      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    try {
      const users = this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
