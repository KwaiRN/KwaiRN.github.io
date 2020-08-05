---
id: storage
title: 数据存储
---

> **storage 的 value 值暂时不支持 Object 类型，待补充**

## KRNStorage.set(table, key, value, callback)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表名 |
| key | string | 是 |  |
| value | string/Object | 是 |  |
| callback | function | 是 | 回调 |


**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |


```js
NativeModules.KRNStorage.set('table', 'key', 'value', (err) => {
	if (err) {
		console.error(err)
	}
})
```

## KRNStorage.get(table, key, callback)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表名 |
| key | string | 是 |  |
| callback | function | 是 | 回调 |


**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |
| value | String/Object | 页面返回的数据，具体类型需要业务约定 |

```js
NativeModules.KRNStorage.get('table', 'key', (err, value) => {
	if (err) {
		console.error(err)
	} else {
		console.log(value)
	}
})
```

## KRNStorage.remove(table, key, callback)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表名 |
| key | string | 是 |  |
| callback | function | 是 | 回调 |

**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |


```js
NativeModules.KRNStorage.remove('table', 'key', (err) => {
	if (err) {
		console.error(err)
	}
})
```


## KRNStorage.clear(table, callback)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表名 |
| callback | function | 是 | 回调 |

**callback 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| error | Object | 错误信息 |

```js
NativeModules.KRNStorage.clear('table', (err) => {
	if (err) {
		console.error(err)
	}
})
```


附：H5 对应的 JSAPI

```js
+ set(table:String, key: String, value: String, callback: String): void
+ getString(table:String, key: String, callback: String): void
+ remove(table:String, key:String, callback: String): void
+ clear(table:String, callback: String): void
```

> errCode 约定：NO_KEY。不存在 key