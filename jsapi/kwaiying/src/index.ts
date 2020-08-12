import { NativeModules } from 'react-native';

/**
 * 后台环境类型
 */
export enum EnvType {
  /** 未知 */
  unknown = -1,
  /** 测试环境*/
  test = 0,
  /** 预发布环境 */
  preonline = 1,
  /** 线上环境 */
  online = 2,
}

export type KwaiYingInfo = {
  /** app 的版本号（Android 和 iOS 不一定一样） */
  appVersion: string;
  /** KRN 框架的版本号 */
  krnVersion: string;
  /** 设备 ID */
  did: string;
  /** 设备总内存(以Byte为单位) */
  totalMemory: Number;
};

export type EnvConfig = {
  type: EnvType;
  url?: string;
};

export type CommonCookie = string;

/**
 * 获取快影应用信息
 * @param  {(info:KwaiYingInfo)=>void} success 成功回调
 * @param  {(errCode:Number)=>void} fail 失败回调
 */
export function getInfoFromKwaiYing(
  success: (info: KwaiYingInfo) => void,
  fail: (errCode: Number) => void
): void {
  NativeModules.Kwaiying.getInfoFromKwaiYing((json: string) => {
    try {
      success(JSON.parse(json) as KwaiYingInfo);
    } catch (e) {
      fail(1);
    }
  });
}
/**
 * 使用该接口，JS 可以根据 Native 的环境配置来请求后台不同的接口，如果是 release 版本的 App，则直接返回 2。
 * @param  {(envConfig:Number)=>void} success
 * @param  {(errCode:Number)=>void} fail
 */
export function getEnv(
  success: (envConfig: Number) => void,
  fail: (errCode: Number) => void
): void {
  NativeModules.Kwaiying.getEnv((mode: Number) => {
    try {
      success(mode);
    } catch (e) {
      fail(1);
    }
  });
}
/**
 * 获取cookie，注意：用户没登录，则 userId/passToken/ky.api_st 不存在
 * @param  {(info:CommonCookie)=>void} success
 * @param  {(errCode:Number)=>void} fail
 * @returns void
 */
export function getCommonCookies(
  success: (info: CommonCookie) => void,
  fail: (errCode: Number) => void
): void {
  NativeModules.Kwaiying.getCommonCookies((json: string) => {
    try {
      success(json as CommonCookie);
    } catch (e) {
      fail(1);
    }
  });
}
/**
 * 是否启动 Native 功能的手势返回，仅对 iOS 有效，安卓空实现
 * @param  {boolean} enable 是否启动
 */
export function setNavSwipe(enable: boolean): void {
  NativeModules.Kwaiying.setNavSwipe(enable);
}
/**
 * @hidden
 * @param  {Number} state
 */

export function setPackageManagerState(state: Number): void {
  NativeModules.Kwaiying.setPackageManagerState(state);
}

export default {
  getInfoFromKwaiYing,
  getEnv,
  getCommonCookies,
  setNavSwipe,
  setPackageManagerState,
};
