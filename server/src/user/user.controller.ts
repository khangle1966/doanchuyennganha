import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  HttpException,
  Put,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { ProfileService } from 'src/profile/profile.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  @Post()
  async create(@Headers() headers: any): Promise<User> {
    try {
      const authHeader = headers.authorization;
      const token = authHeader.replace('Bearer ', '');
      const decodedToken = await this.authService.verifyToken(token);
      const uid = decodedToken.uid;
      const existedUser = await this.userService.findOne(uid);
      if (existedUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const user: User = {
        uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        role: 'user',
        profile: null,
      };
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async findAllUser() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      const userProfile = await this.profileService.findOne(user.profile);
      if (!userProfile) {
        await this.userService.remove(id);
      } else {
        await this.profileService.remove(userProfile.id);
        await this.userService.remove(id);
      }
    } catch (error) {
      throw error;
    }
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
