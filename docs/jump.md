---
id: jump
title: 跳转Native
---


## krn.open(url, callback)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| url | string | 是 | 跳转链接，参数可填在这里 |
| callback | function | 是 | 回调 |


**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |
| data | Any | 页面返回的数据，具体类型需要业务约定 |


+ 跳相册页

```js
NativeModules.krn.open(
	"kwaiying://pick?source=delogo",
	(err, data) => {
		if (err) {
			console.error(err)
		} else {
			let mediaInfo = data['media'][0];	// pb 协议的格式
			const result = KwaiyingPb.MediaInfo.deserializeBinary(mediaInfo).toObject();
			console.log(result);	
		}
	}
)
```

## krn.goBack()
退出当前业务的 RN 页面