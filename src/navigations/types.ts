import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = 
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainStackParamList = {
  Home: undefined;
  Chat: { user: any };
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = 
  NativeStackScreenProps<MainStackParamList, T>; 