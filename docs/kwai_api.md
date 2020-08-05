---
id: kwai_api
title: 快影 API
---


[RN 原生组件与接口](https://reactnative.dev)

## getInfoFromKwaiYing
H5

```js
kwaiying.getInfoFromKwaiYing()
```

KRN

```js
NativeModules.Kwaiying.getInfoFromKwaiYing((res) => { 
	console.log(JSON.parse(res)); 
})
```

返回值参数说明

|  参数   | 类型 | 说明 |
|  ----  | ----  | ---- |
| did  | string | 设备 ID |
| krnVersion  | string | KRN 框架的版本号 |
| appVersion  | string | app 的版本号（*Android 和 iOS 不一定一样*） |
| totalMemory  | string | 设备总内存(以Byte为单位) |


## getCommonCookies
```js
NativeModules.Kwaiying.getCommonCookies((res) => { 
	console.log(JSON.parse(res)); 
})
```

> 注意：用户没登录，则 userId/passToken/ky.api_st 不存在

返回值参数说明，以下是 iOS 和 android 平台的交集参数

|  参数   | 类型 | 说明 |
|  ----  | ----  | ---- |
| did  | string | 设备 ID |
| sid  | string | "ky.api" |
| userId  | string | 用户 ID |
| ky.api_st  | string | 未知 |
| sys  | string | 系统版本 |
| passToken  | string | 设备 ID |



## weblogger
安装方法

```sh
yarn add @krn/weblogger
yarn add @krn/bootstrap

// 在index.js入口第一行添加
import '@krn/bootstrap';

// 在其他地方初始化weblogger
import {RNWeblog} from '@krn/weblogger/dist/log.bridge.common.js';
const weblog = new RNWeblog(
    {},
    {
        // baseOptions - 埋点公参配置，和埋点参数更加相关
        service_name: 'josh_service',
        sub_biz: 'josh_biz',
        need_encrypt: true,
        h5_extra_attr: { joshtest: 'joshtest' },
    },
);

// 具体类型和参数见https://component.corp.kuaishou.com/docs/weblogger/document/api.html
        weblog.send('SHOW', {
            action: 'lab_page_show',
            params: {
                show: true,
            },
        });
```

接口与官网一致。不支持插件

proto 上报方式。RecoReportEvent.proto 需要业务引入。可以查阅参考资料。

```js
weblog.send('PROTO', {
    type: 'reco_report_event',
    payload: RecoReportEvent.SerializeAsString(),
    eventId: 'aaaabbb',
});
```

## setNavSwipe（iOS）
是否禁止 Native 功能的手势返回，仅对 iOS 有效，安卓空实现

```js
NativeModules.Kwaiying.setNavSwipe(bool enable);
```

## 获取当前环境配置

使用该接口，JS 可以根据 Native 的环境配置来请求后台不同的接口

```js
NativeModules.Kwaiying.getEnv((mode) => { 

})
```

mode: 0 表示测试环境；1 表示预发布环境；2 表示正式环境

如果是 release 版本的 App，则直接返回 2


## 参考资料
+ [上报数据查询地址](https://app-analysis.corp.kuaishou.com/#/event_track?id=2085&appName=KUAISHOU_VIDEO_EDITOR&sampling=APP)
+ [快影WebView的JS接口](https://docs.corp.kuaishou.com/d/home/fcAAnp3wLKhWtDEqKk7Hpwpqq)
+ [RN AsyncStorage](https://github.com/react-native-community/async-storage)
+ [weblogger官网](https://component.corp.kuaishou.com/docs/weblogger/js)
+ [根据 proto 生成代码](https://www.npmjs.com/package/protobufjs)
+ [使用Typescript](https://reactnative.dev/docs/typescript)

