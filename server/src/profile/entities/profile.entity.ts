import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Course } from 'src/course/entities/course.entity';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ default: null })
  displayName: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  gender: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: [] })
  courses: Course[];

  @Prop()
  role: string;

  @Prop({ default: null })
  notifications: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  })
  messages: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
