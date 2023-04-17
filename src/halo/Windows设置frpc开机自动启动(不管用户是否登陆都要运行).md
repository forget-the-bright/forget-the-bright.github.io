---
icon: edit
date: 2021-11-26
category:
  - 系统配置
tag:
  - frp
headerDepth: 5
---


# Windows设置frpc开机自动启动(不管用户是否登陆都要运行)
### 新建start.bat,内容如下(放到自己frpc实际目录下):
```shell
@echo off
:home
frpc -c frpc.ini
goto home
```
### 打开开始菜单，输入 “任务计划程序” 将会自动搜索，接着打开它。![](https://img-blog.csdnimg.cn/20200929111009349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkYWxp,size_16,color_FFFFFF,t_70)

点击右侧的 “创建任务”，名称随意填写，安全选项选择 “不管用户是否登录都要运行”，当然你也可以选择 “只在用户登录时运行”。

选择 “不管用户是否登录都要运行” 可以让你的电脑在断电自动启动后自动运行 frp，你就可以远程桌面连接电脑了。

“使用最高权限运行” 也是可选的，根据个人需要可以选上。

最后勾选 “隐藏”，就不会在启动时弹出命令行窗口了。

![](https://img-blog.csdnimg.cn/20200929111043192.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkYWxp,size_16,color_FFFFFF,t_70)

接着转到 “触发器” 页，点击新建，选择 “启动时”
![](https://img-blog.csdnimg.cn/20200929111107766.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkYWxp,size_16,color_FFFFFF,t_70)

接着转到 “操作” 页，点击新建，选择 “启动程序”

在程序或脚本一栏选择第一步创建的 start.bat，下面的 “起始于” 填写 start.bat 的路径（不要包含 start.bat）

例如你的 start.bat 在 E:\frp\start.bat，那么你只需要在 “起始于” 填写 E:\frp\
![](https://img-blog.csdnimg.cn/20200929111151748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dkYWxp,size_16,color_FFFFFF,t_70)
接着返回 “常规” 页，点击确定，此时会要求输入密码，输入你的电脑密码，然后点击确定即可。

以后就会开机自动启动 frp 了，并且不会弹出命令提示符窗口。