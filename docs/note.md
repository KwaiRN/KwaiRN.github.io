---
id: note
title: 开发备忘
---

## 如何正确管理 RN 中的图片资源

## 如何快速打开
1. 防止白屏，设置了底色 #191919
2. 对 JSBridge 进行缓存

## JSBundle 使用 LFS 管理
## 如何让 RN 在后台运行

## 页面栈的手势横滑
+ 一个 Controller，多个 RN 页面
+ 禁用某个 RN 页面的手势横滑
+ 如果页面栈中只有一个 RN 页面，触发系统横滑
+ 如果页面栈中有多个 RN 页面，触发 RN 自己的横滑返回

## 页面栈
+ reset：清空所有页面
+ navigate：Push 一个新页面
+ replace：刷新当前页面
+ 与 Native 的 goBack 配合使用
+ goBack 时，如果此时 RN 页面栈有多个页面，发现会有残影，闪现上一个 RN 页面，只需要对容器的 View 的 clipsToBounds 置为 YES 即可，因为 RN 是通过对 View 的偏移来模拟页面的 Push 动画和手势返回

## 已知的一些坑
1. 【上热门】Tab 的低端机测试：偏移
2. iOS 上 Statusbar 

## WebLogger