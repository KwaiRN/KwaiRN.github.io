import { NativeModules } from 'react-native';

/**
 * 跳转 Native，接入方需要实现对应的接口
 * @param  {string} url 跳转schema，由业务与接入方定义，例如kwaiying://krn?packageName=${启动应用名}&jsbundle=${应用包的地址，完整 url 则拉起 RN 应用}&data=${json 化的启动参数。注意：所有参数必须 encode 之后传入
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
 * 退出当前业务的 RN 页面
 */
export function goBack(): void {
  NativeModules.krn.goBack();
}

export default {
  open,
  report,
  goBack,
};
