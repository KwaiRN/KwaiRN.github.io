## 第一种更新文档方法

1. **切换到 source 分支**

```sh
git checkout source
```

2. 修改你的文件


3. 提交部署

```sh
sh GitPush.sh "Your Commit Message"
```

4. 等待远程构建完毕（大约 1 分钟），查看官网是否部署成功

## 第二种更新文档的方法
直接点击页面底部的 "Edit This Page"，到 Github 中在线编辑

## 本地调试
1. **切换到 source 分支**

```sh
git checkout source
```

2. 修改你的文件

3. 本地预览，打开[本地服务器](http://localhost:3000/)

```sh
npm start
```
