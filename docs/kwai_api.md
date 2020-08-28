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
        service_name: 'popular_service',
        sub_biz: 'popular_biz',
        need_encrypt: true,
        h5_extra_attr: { popular: true },
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
### getEnv

Native 提供环境模式，JS 根据该值来自主选择不同的 URL，URL 由 JS 定义

```js
NativeModules.Kwaiying.getEnv((mode) => { 

})
```

返回值参数说明

|  参数   | 类型 | 说明 |
|  ----  | ----  | ---- |
| mode  | int | 0：测试环境；1：预发布环境；2：正式环境 |


### getEnvConfig
Native 提供 URL 给 JS，JS 不需要关心该 URL 是什么，也不需要关心现在是否是测试环境

```js
NativeModules.Kwaiying.getEnvConfig((res) => { 

})
```

返回值 res 参数说明

|  参数   | 类型 | 说明 |
|  ----  | ----  | ---- |
| url  | string | 服务器地址 |
| type  | int | 0：测试环境；1：预发布环境；2：正式环境 |
| useDirect  | bool | 【定向请求】的开关，header里增加一个“direct”字段，主要是用于服务端线上转发，拿到的请求如果携带这个header那么就定向转发到配置好的某一个机器上去，线上环境就可以方便debug了 |

## Kwaiying.login(callback)
如果未登录，拉起登录页面，登录成功后回调登录信息；如果已登录，则该方法不起任何作用

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| callback | function | 否 | 回调 |


**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |
| loginInfo | Object | {"userId":"", "nickName":"", "avatarUrl":"", "token":""} |

```js
NativeModules.Kwaiying.login((err, loginInfo) => { 
    if (!err) {
        console.log(loginInfo)
    }
})
```


## Kwaiying.loginInfo(callback)
获取登录信息，如果未登录则返回空

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| callback | function | 是 | 回调 |


**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |
| loginInfo | Object | {"userId":"", "nickName":"", "avatarUrl":"", "token":""} |

```js
NativeModules.Kwaiying.loginInfo((err, loginInfo) => { 
    if (!err) {
        console.log(loginInfo)
    }
})
```


## 参考资料
+ [上报数据查询地址](https://app-analysis.corp.kuaishou.com/#/event_track?id=2085&appName=KUAISHOU_VIDEO_EDITOR&sampling=APP)
+ [快影WebView的JS接口](https://docs.corp.kuaishou.com/d/home/fcAAnp3wLKhWtDEqKk7Hpwpqq)
+ [RN AsyncStorage](https://github.com/react-native-community/async-storage)
+ [weblogger官网](https://component.corp.kuaishou.com/docs/weblogger/js)
+ [根据 proto 生成代码](https://www.npmjs.com/package/protobufjs)
+ [使用Typescript](https://reactnative.dev/docs/typescript)

