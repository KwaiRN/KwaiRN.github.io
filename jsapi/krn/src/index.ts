import { NativeModules } from 'react-native';

/**
 * 跳转 Native，接入方需要实现对应的接口
 * @param  {string} url 跳转schema，由业务与接入方定义
 * @param  {(data:any)=>void} success - 成功回调，data由业务与接入方定义
 * @param  {(err:any)=>void} fail 失败回调，err包含错误信息
 */
export function open(
  url: string,
  success: (data: any) => void,
  fail: (err: any) => void
): void {
  NativeModules.krn.open(url, (err: any | null, data: any) => {
    if (err) {
      fail(err);
    } else {
      success(data);
    }
  });
}
/**
 * KRN 简版 native 上报
 * @param  {string} action 埋点名称
 * @param  {Map<string, any>} params 上报参数
 */
export function report(action: string, params: Map<string, any>): void {
  NativeModules.krn.report(action, params);
}
/**
 * 后退。等同于iOS手势返回，android后退键
 */
export function goBack(): void {
  NativeModules.krn.goBack();
}

export default {
  open,
  report,
  goBack,
};
