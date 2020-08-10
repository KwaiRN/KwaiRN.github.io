import { NativeModules } from 'react-native';
/**
 * @param  {string} url
 * @param  {(data:any)=>void} success
 * @param  {(errCode:Number)=>void} fail
 */
export function open(
  url: string,
  success: (data: any) => void,
  fail: (errCode: Number) => void
): void {
  NativeModules.krn.open(url, (errCode: Number | null, data: any) => {
    if (errCode) {
      fail(errCode);
    } else {
      success(data);
    }
  });
}
/**
 * @param  {string} action
 * @param  {any} params
 * @returns void
 */
export function report(action: string, params: any): void {
  NativeModules.krn.report(action, params);
}
/**
 * @returns void
 */
export function goBack(): void {
  NativeModules.krn.goBack();
}

export default {
  open,
  report,
  goBack,
};
