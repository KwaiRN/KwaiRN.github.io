---
id: note
title: 开发备忘
---

## 如何优化 RNController 的打开体验
1. 防止白屏，设置 RCTRootView 的底色 #191919
2. 对 JSBridge 进行缓存

## 页面栈的手势横滑
一个 Controller 可能会承载多个 RN 页面，默认情况下横滑左边缘，如果页面栈中只有一个 RN 页面，会触发系统横滑，退出 Controller；如果页面栈中有多个 RN 页面，触发 RN 自己的横滑返回（本质上是一个 View 的模拟动画）

页面栈中有多个 RN 页面的情况下，如果要禁用中间某个 RN 页面的手势横滑，可以提供 JSAPI，当该页面出现的时候禁止系统的横滑；页面消失的时候启用系统的横滑，具体代码如下

```objc
RCT_EXPORT_METHOD(setNavSwipe:(BOOL)canswipe)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        KYLogI(kKWYReactNativeModuleName, @"setNavSwipe => %@", @(canswipe));
        // 获取当前显示的 navigationController 然后根据 RN 那边传过来的 canswipe 参数决定是否禁止侧滑返回
        [CommonUtils getCurrentVC].navigationController.interactivePopGestureRecognizer.enabled = canswipe;
    });
}
```

对应的 JS 代码如下

```js
componentDidMount() {
    this._unsubscribeViewAppear = this.props.navigation.addListener(
        'focus',
        (obj) => {
            NativeModules.Kwaiying.setNavSwipe(false);
        },
    );
    this._unsubscribeViewDisappear = this.props.navigation.addListener(
        'blur',
        (obj) => {
            NativeModules.Kwaiying.setNavSwipe(true);
            this.cancelUpload();
        },
    );
}

componentWillUnmount() {
    this._unsubscribeViewAppear && this._unsubscribeViewAppear();
    this._unsubscribeViewDisappear && this._unsubscribeViewDisappear();
}
```

## 页面栈的管理
页面栈是通过 [react-navigation](https://reactnavigation.org/docs/getting-started) 来管理的

+ reset：清空所有页面
+ navigate：Push 一个新页面
+ replace：刷新当前页面
+ 与 Native 的 goBack 配合使用
+ goBack 时，如果此时 RN 页面栈有多个页面，发现会有残影，闪现上一个 RN 页面，只需要对容器的 View 的 clipsToBounds 置为 YES 即可，因为 RN 是通过对 View 的偏移来模拟页面的 Push 动画和手势返回

goBack 代码如下

```objc
RCT_EXPORT_METHOD(goBack)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[KRNUtils rootNavVC] popViewControllerAnimated:YES];
    });
}
```

## 如何让 RN 在后台运行
业务中，我们使用 RN 来实现包管理逻辑，这个逻辑是不需要 UI 界面的，只需要保证 JS 代码在后台运行即可

RN 的 JS 代码必须通过 RCTRootView 来承载，而 RCTRootView 必须被添加到父 View 上，以及有非 0 的宽高才能触发 JS 的执行

以下代码实现了 RN 的后台运行，先创建一个 RCTRootView 添加到某个 View 上，且宽高不为 0，然后立刻移除即可

```objc
RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation_packageManager moduleProvider:nil launchOptions:nil];
self.packageManagerHideView = [[RCTRootView alloc] initWithBridge:bridge
                                                       moduleName:@"test"
                                                initialProperties:nil];
self.packageManagerHideView.frame = CGRectMake(0, 0, 1, 1);
[[KWYLocalViewControllerHelper currentNavRootVC].view addSubview:self.packageManagerHideView];
[self.packageManagerHideView removeFromSuperview];
[bridge enqueueJSCall:@"AppRegistry" method:@"startHeadlessTask" args:@[@0, @"mainTask", @0] completion:NULL];
```

## 如何正确管理 RN 中的图片资源
[使用混合App的图片资源](https://reactnative.cn/docs/0.48/images#%E4%BD%BF%E7%94%A8%E6%B7%B7%E5%90%88app%E7%9A%84%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90)

我们是混合 App，图片资源如果想用 Xcode 的 image asset 管理可以减少包大小，但是会导致前端开发使用起来不方便，需要为图片指定宽高。包大小的问题我们可以通过离线包升级的方式来规避

## JSBundle 使用 lfs 管理
JSBundle、sourcemap.js 等大文件建议用 lfs 来管理

## iOS 上 JS 无法获知 Controller 的 viewWillAppear/viewDidDisappear
[AppState 组件](https://reactnative.cn/docs/0.50/appstate)能够通知 JS 关于 Controller 的状态变化，包括切换前后台和页面可见/消失

安卓上运转良好，但是在 iOS 上 Controller 的 viewWillAppear/viewDidDisappear 没有被调用

经研究，一种可行的解决方法是在 Controller 中手动通知

```objc
- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    RCTEventEmitter *appState = [self.bridge moduleForName:@"AppState"];
    [appState sendEventWithName:@"appStateDidChange" body:@{@"app_state": @"show"}];
    
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    RCTEventEmitter *appState = [self.bridge moduleForName:@"AppState"];
    [appState sendEventWithName:@"appStateDidChange" body:@{@"app_state": @"hide"}];
}
```

## image 需要 @2x/@3x，不需要 @1x
前端同学可能不太了解移动端，对于图片资源，开发 RN 和开发 Native 是大同小异的，都是需要 @2x 和 @3x 图片资源，而不需要 1 倍图


## 已知的一些坑
1. 【上热门】Tab 的低端机测试：偏移
2. iOS 上 Statusbar 

## WebLogger
## 运行 Native Demo
+ Android

```js
npx react-native init MyReactNativeApp --version 0.62.2
npm install 各种 native 插件
npx kia-cli run-android //第一次执行会提示输入 Android 环境的安装目录，以后则不用。
```

+ iOS

待补充

```js

```