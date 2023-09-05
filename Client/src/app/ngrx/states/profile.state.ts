import { Profile } from 'src/app/models/profile.model';

export interface ProfileState {
  profile: Profile;
  idToken: string;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
}
