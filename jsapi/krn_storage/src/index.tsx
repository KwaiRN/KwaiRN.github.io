import { NativeModules } from 'react-native';
import type * as Types from './types';

export function set(
  table: string,
  key: string,
  value: string,
  success: () => void,
  fail: (err: Types.KRNError) => void
): void {
  NativeModules.KRNStorage.set(
    table,
    key,
    value,
    (err: Types.KRNError | null) => {
      if (err) {
        fail(err);
      } else {
        success();
      }
    }
  );
}

export function get(
  table: string,
  key: string,
  success: (data: string) => void,
  fail: (err: Types.KRNError) => void
): void {
  NativeModules.KRNStorage.get(
    table,
    key,
    (err: Types.KRNError | null, data: string) => {
      if (err) {
        fail(err);
      } else {
        success(data);
      }
    }
  );
}

export function remove(
  table: string,
  key: string,
  success: () => void,
  fail: (err: Types.KRNError) => void
): void {
  NativeModules.KRNStorage.remove(table, key, (err: Types.KRNError | null) => {
    if (err) {
      fail(err);
    } else {
      success();
    }
  });
}

export function clear(
  table: string,
  success: () => void,
  fail: (err: Types.KRNError) => void
): void {
  NativeModules.KRNStorage.clear(table, (err: Types.KRNError | null) => {
    if (err) {
      fail(err);
    } else {
      success();
    }
  });
}

export default {
  set,
  get,
  clear,
  remove,
};
