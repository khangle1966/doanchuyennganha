import { Profile } from 'src/app/models/profile.model';

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
  isUpdating: boolean;
  isUpdateSuccess: boolean;
  updateErrorMessage: string;
}
