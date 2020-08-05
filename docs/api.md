---
id: api
title: API（未定）
---

[RN 原生组件与接口](https://reactnative.dev)

## 跳转 Native

```js
krn.open(url, callback)
```

注意：Native 需要实现对应的接口（待补充）


## 存储
### KVStorage

```js
```

## 上报

### KRN 简版 native 上报
addTaskEvent 接口固定 type 为 1，operationType 为 1

```js
krn.report(key: string, params: string, callback: function);
```

+ key: 埋点名称。
+ params：json 字符串，key/value 在 native 会转为 map 上报。
+ callback：回调函数。暂无返回值

### weblogger
安装方法

```sh
npm install @krn/weblogger
```

接口与官网一致。不支持插件

proto 上报方式。RecoReportEvent.proto 需要业务引入。可以查阅参考资料。

```js
import {RNWeblog} from '@krn/weblogger/dist/log.bridge.common.js';
import './KRNBootstrap';	// index.js 入口 
weblog.sendImmediately('PROTO', {
    type: 'reco_report_event',
    payload: RecoReportEvent.SerializeAsString(),
    eventId: 'aaaabbb',
});
```

## 基础能力
### setNavSwipe（iOS）
是否禁止 Native 功能的手势返回，仅对 iOS 有效，安卓空实现

```js
krn.setNavSwipe(bool enable);
```

### 获取当前环境配置

使用该接口，JS 可以根据 Native 的环境配置来请求后台不同的接口

```js
krn.getEnv((mode) => { 

})
```

mode: 0 表示测试环境；1 表示预发布环境；2 表示正式环境

如果是 release 版本的 App，则直接返回 2