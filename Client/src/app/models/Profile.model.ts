export interface Profile {
    _id: string;
    userName: string;
    displayName: string;
    email: string;
    country: string;
    avatar: string;
    gender: string;
    bio: string;
    notifications: string[];
    messages: string[];
    courses: string[];
    ongoingCourses: string[];
    completedCourses: string[];
  }
  