import { NativeModules } from 'react-native';

export type KRNError = Map<String, any>;
/**
 * @param  {string} table 表名
 * @param  {string} key 键
 * @param  {string} value 值
 * @param  {()=>void} success 成功回调
 * @param  {(err:KRNError)=>void} fail 失败回调
 */
export function set(
  table: string,
  key: string,
  value: string,
  success: () => void,
  fail: (err: KRNError) => void
): void {
  NativeModules.KRNStorage.set(
    table,
    key,
    value,
    (err: KRNError | null) => {
      if (err) {
        fail(err);
      } else {
        success();
      }
    }
  );
}
/**
 * @param  {string} table 表名
 * @param  {string} key 键
 * @param  {(data:string)=>void} success 成功回调，data为key对应的value
 * @param  {(err:KRNError)=>void} fail 失败回调，如果key不存在，err.message为"NO_KEY"
 */

export function get(
  table: string,
  key: string,
  success: (data: string) => void,
  fail: (err: KRNError) => void
): void {
  NativeModules.KRNStorage.get(
    table,
    key,
    (err: KRNError | null, data: string) => {
      if (err) {
        fail(err);
      } else {
        success(data);
      }
    }
  );
}
/**
 * 删除key
 * @param  {string} table 表名
 * @param  {string} key 键
 * @param  {()=>void} success 成功回调
 * @param  {(err:KRNError)=>void} fail 失败回调
 */
export function remove(
  table: string,
  key: string,
  success: () => void,
  fail: (err: KRNError) => void
): void {
  NativeModules.KRNStorage.remove(table, key, (err: KRNError | null) => {
    if (err) {
      fail(err);
    } else {
      success();
    }
  });
}
/**
 * 清楚数据库
 * @param  {string} table 表名
 * @param  {()=>void} success 成功回调
 * @param  {(err:KRNError)=>void} fail 失败回调
 */
export function clear(
  table: string,
  success: () => void,
  fail: (err: KRNError) => void
): void {
  NativeModules.KRNStorage.clear(table, (err: KRNError | null) => {
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
