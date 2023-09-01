import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

export enum Category {
  WEB = 'Web Development',
  MOBILE = 'Mobule Development',

}

@Schema({ timestamps: true })
export class Course {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  img: string;

  @Prop()
  category: Category;

  @Prop()
  price: number;

  @Prop()
  rating: number;

  @Prop()
  language: string;

  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
  // students: string[];
  @Prop()
  author: string;

}

export const CourseSchema = SchemaFactory.createForClass(Course);
