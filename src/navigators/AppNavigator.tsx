import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';

export const Stack = createNativeStackNavigator<AppStackParamList>();
