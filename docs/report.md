---
id: report
title: 数据上报
---


## krn.report(string key, Object data);

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| key | string | 事件名 |
| data | Object | 上报的自定义数据，key 为配置中的字段名，value 为上报的数据 |


```js
NativeModules.krn.report('click', {
  userId: '123'
})
```