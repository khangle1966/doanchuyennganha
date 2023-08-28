import { UserInfo } from "src/app/models/User.model";

export interface UserState {
    user: UserInfo;
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: any;
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrorMessage: any;
    email: string;
  }