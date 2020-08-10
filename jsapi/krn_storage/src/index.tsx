import { NativeModules } from 'react-native';

type StorageType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Storage } = NativeModules;

export default Storage as StorageType;
