---
id: component
title: 组件列表
---

## JS 组件

### react-native-actionsheet
默认 android 是组件自定义实现，ios 是原生

如果两端都使用自定义实现需要

```js
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
````

目前问题：

ios 使用原生时样式不支持部分样式的设置，options 不支持 jsx

### @react-navigation/stack
页面栈管理

### react-native-iphone-x-helper
用于解决 ios 刘海屏安全区问题

### react-native-swiper
Swiper 组件

### react-native-tiny-toast
Toast 组件

### react-native-progress-circle
圆形进度条
> ios和android的borderWidth大小不一致

## Native 组件
引入 Native 组件列表会增大安装包大小，因此需要谨慎添加，请确保你要新增的 Native 组件的功能不会与以下已有的组件重复

### react-native-slider
视频进度条

目前问题：滑块不支持样式，只能通过图片修改，ios 默认滑块偏大

### react-native-video
视频组件
> 需要自己实现进度条  
> TODO: 封装`@krn/react-native-video`组件，可以把slider塞进去

### react-native-linear-gradient

渐变色背景，得包裹一层

可以考虑放在 stylesheet 中支持，让组件自动包裹 react-native-linear-gradient

### react-native-fs
文件操作，如：文件读、写、上传、下载、删除等
> android的上传/下载进度是模拟出来的，且不支持取消上传任务，建议使用`rn-fetch-blob`

### @react-native-community/netinfo
获取当前的网络状态

### @react-native-community/cameraroll
操作本地相册，如：读取、保存 相册等

安卓和 ios 的对远程图片和视频保存到本地相册的支持不一致，如果要保存视频，需要先用 react-native-fs 写到本地目录，之后用本地路径将其保存到相册

### react-native-create-thumbnail
获取视频第 n 毫秒的缩略图
> 需做好缓存，长列表下不建议使用该组件

### react-native-gesture-handler
手势相关，随 @react-navigation/native 一起引入

### react-native-safe-area-context
安全区，随 @react-navigation/native 一起引入

### react-native-reanimated
动画相关，随 @react-navigation/native 一起引入

### rn-fetch-blob
上传、下载文件

### react-native-zip-archive
压缩与解压缩

### react-native-blur
遮罩、蒙版效果
> ios 建议使用shouldRasterizeIOS复用位图，否则滑动时，会出现闪烁问题

### react-native-smooth-pull-to-refresh
下拉刷新，纯JS组件，性能没有native好，但ios与android均支持下拉loading样式设置。



[iOS 最新的实时组件列表请参见这里](http://git.corp.kuaishou.com/chenying09/kwai_react_native_ios/-/tree/master/release_libraries)
