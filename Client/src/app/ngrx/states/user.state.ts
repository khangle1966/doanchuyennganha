import { UserInfo } from 'src/app/models/user.model';

export interface UserState {
  user: UserInfo;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: any;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrorMessage: any;
}
