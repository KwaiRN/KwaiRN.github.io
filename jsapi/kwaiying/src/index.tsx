import { NativeModules } from 'react-native';

type KwaiyingType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Kwaiying } = NativeModules;

export default Kwaiying as KwaiyingType;
