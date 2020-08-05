---
id: storage
title: 数据存储
---

> **storage 的 value 值暂时不支持 Object 类型，待补充**

## krn.storage.setStorage(Object obj)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表格名 |
| key | string | 是 |  |
| value | string/Object | 是 |  |
| success | function | 否 | 成功回调 |
| fail | function | 否 | 失败回调 |
| complete | function | 否 | 完成回调（调用成功、失败都会执行） |

**fail 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| errCode | Number | 错误码 |

## krn.storage.getStorage(Object obj)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表格名 |
| key | string | 是 |  |
| success | function | 否 | 成功回调 |
| fail | function | 否 | 失败回调 |
| complete | function | 否 | 完成回调（调用成功、失败都会执行） |

**success 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| data | Object/string | key 对应的内容 |

**fail 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| errCode | Number | 错误码 |

## krn.storage.removeStorage(Object obj)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表格名 |
| key | string | 是 |  |
| success | function | 否 | 成功回调 |
| fail | function | 否 | 失败回调 |
| complete | function | 否 | 完成回调（调用成功、失败都会执行） |

**fail 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| errCode | Number | 错误码 |


## krn.storage.clearStorage(Object obj)

**参数说明**

| 参数 | 类型 | 必填 | 说明
| ---- | ---- | ---- | ---- |
| table | string | 是 | 表格名 |
| success | function | 否 | 成功回调 |
| fail | function | 否 | 失败回调 |
| complete | function | 否 | 完成回调（调用成功、失败都会执行） |

**fail 返回参数说明**

| 参数 | 类型 | 说明 |
| ---- | ---- | ---- |
| errCode | Number | 错误码 |


附：H5 对应的 JSAPI

```js
+ set(table:String, key: String, value: String, callback: String): void
+ getString(table:String, key: String, callback: String): void
+ remove(table:String, key:String, callback: String): void
+ clear(table:String, callback: String): void
```

> errCode 约定：NO_KEY。不存在 key