import { Profile } from 'src/app/models/Profile.model';

export interface ProfileState {
  profile: Profile;
  idToken: string;
  isLoading: boolean;
  isSuccessful: boolean;
  errorMessage: string;
}
