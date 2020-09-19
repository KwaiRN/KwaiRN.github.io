---
id: other
title: 其他接口
---


## krn.version(callback)

返回 KRN 的版本号

**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| version | string | 版本号 |


```js
NativeModules.krn.version((version) => {
	console.log(version)
})
```