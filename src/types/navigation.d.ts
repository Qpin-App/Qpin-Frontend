import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Home: undefined;
  Gallery: undefined;
  Scrap: undefined;
  CameraScreen: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;