---
icon: edit
date: 2022-11-12
category:
  - 系统配置
  - Linux
  - nodejs
tag:
  - Arch
  - ArchLinux
  - nodejs
  - nvm
  - pm2
  - pm2-logrotate
headerDepth: 5
---


# ArchLinux 安装nvm nodejs并配置安装pm2 pm2-logrotate
### 安装nvm
#### 下载安装脚本
nvm 官网地址 [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
安装前提服务器配置好```git``` ```curl``` 或者 ```wget```
网络好的同学可以使用官网的例子 
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```
或
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```
网络不好的同学可以使用我配置好的脚本
```
curl -o- https://local.wuanwanghao.top:9000/test/nvm_install.sh | bash
```
或
```
wget -qO- https://local.wuanwanghao.top:9000/test/nvm_install.sh | bash
```
#### 配置环境变量
一般centos 和 ubuntu 环境安装的同学就已经可以使用 nvm 了 但是Arch linux 同学还不能使用，我们要配置下环境变量
```
vim ~/.profile
```
##### 写入配置
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node/
export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
```
##### 应用配置
``` 
source ~/.profile
```

#### nvm 常用命令
```shell
nvm install stable ## 安装最新稳定版 node
nvm install <version> ## 安装指定版本
nvm uninstall <version> ## 删除已安装的指定版本
nvm use <version> ## 切换使用指定的版本node
nvm ls ## 列出所有安装的版本
nvm ls-remote ## 列出所有远程服务器的版本
nvm current ## 显示当前的版本
nvm alias <name> <version> ## 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名
nvm reinstall-packages <version> ## 在当前版本 node 环境下，重新全局安装指定版本号的 npm 包
nvm alias default [node版本号] ##设置默认版本
```
### 安装nodejs
nvm 安装 最新发行版
```shell
nvm install stable
```
#### 配置npm 源
```shell
npm config set registry https://registry.npmjs.org
```
#### 安装yarn
```shell
npm install -g yarn 
```
#### 配置yarn源
```shell
yarn config set registry https://registry.npm.taobao.org
```

### 安装pm2 进程管理工具
```
npm install -g pm2
```
#### pm2 常用命令
```txt
pm2 start app.js --name="fx67ll" 启动并命名为fx67ll，没有命名的话后续可以用id替代name
pm2 start app.js --watch 当文件变化时自动重启应用
pm2 start script.sh 启动bash脚本
pm2 list 查看所有启动的应用列表
pm2 monit 显示每个应用程序的CPU和内存占用情况
pm2 show [app-id/app-name] 显示指定应用程序的所有信息
pm2 log 显示应用程序的日志信息
pm2 log [app-id/app-name] 显示指定应用程序的日志信息
pm2 flush 清空所有日志文件
pm2 stop all 停止所有应用程序
pm2 stop [app-id/app-name] 停止指定应用程序
pm2 restart all 重启所有应用程序
pm2 restart [app-id/app-name] 重启指定应用程序
pm2 delete all 关闭并删除所有应用程序
pm2 delete [app-id/app-name] 删除指定的应用程序
pm2 reset [app-id/app-name] 重置重启数量
pm2 startup 创建开机自启动命令
pm2 save 保存当前应用列表
pm2 resurrect 重新加载保存的应用列表
pm2 update 保存进程，杀死并重启进程，一般用于更新pm2版本
pm2 ecosystem 生成一个示例json配置文件
```
#### 启动应用 
```
pm2 start mayfly
```
#### 查看应用
```
pm2 list
```
![image-1668258326917](https://local.wuanwanghao.top:9000/test/test/image-1668258326917.png)
#### 设置开机启动
```
pm2 startup
pm2 save
```
```运行pm2 startup 在/etc/init.d/目录下生成pm2-root的启动脚本，且自动将pm2-root设为服务。```
#### pm2 查看日志
```
pm2 logs mayfly
```
![image-1668258487288](https://local.wuanwanghao.top:9000/test/test/image-1668258487288.png)
**同时我们也可以使用 tail -f 查看指定的文件的日志**
```
tail -200f /root/.pm2/logs/main.out.log
```
```但是pm2自带的日志功能是不支持自动分割的，这就会导致随之时间的推移，我们的日志文件会越来越大，不但会影响性能，在后期排查问题的时候也会很麻烦，这时我们就可以使用pm2-logrotate插件来解决上面的问题。安装也是非常简单```
#### 安装pm2-logrotate
```
pm2 install pm2-logrotate
```
通过 pm2 conf pm2-logratate 可以查看详细的配置
![image-1668258663216](https://local.wuanwanghao.top:9000/test/test/image-1668258663216.png)
![image-1668258687030](https://local.wuanwanghao.top:9000/test/test/image-1668258687030.png)
比如我们可以设置日志文件大小为1KB
```
pm2  set pm2-logrotate:max_size 1k
```
修改完不要忘记重启服务
```
pm2 restart all
```
当大小达到1KB就会自动分割，格式如：main-out__2022-07-29_11-00-32.log 的文件。

pm2日志文件储存在 /root/.pm2/logs 文件夹下。
![image-1668258827133](https://local.wuanwanghao.top:9000/test/test/image-1668258827133.png)
