import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

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
  sex: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ default: [] })
  courses: string[];

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
