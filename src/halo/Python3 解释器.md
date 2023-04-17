---
icon: edit
date: 2021-09-20
category:
  - python
  - Linux
tag:
  - python
headerDepth: 5
---


# Python3 解释器
# Python3 解释器
Linux/Unix的系统上，一般默认的 python 版本为 2.x，我们可以将 python3.x 安装在 /usr/local/python3 目录中。

安装完成后，我们可以将路径 /usr/local/python3/bin 添加到您的 Linux/Unix 操作系统的环境变量中，这样您就可以通过 shell 终端输入下面的命令来启动 Python3 。

>Python 解释器可不止一种哦，有 CPython、IPython、Jython、PyPy 等。

>顾名思义，CPython 就是用 C 语言开发的了，是官方标准实现，拥有良好的生态，所以应用也就最为广泛了。

>而 IPython 是在 CPython 的基础之上在交互式方面得到增强的解释器（http://ipython.org/）。

>Jython 是专为 Java 平台设计的 Python 解释器（http://www.jython.org/），它把 Python 代码编译成 Java 字节码执行。

>PyPy 是 Python 语言（2.7.13和3.5.3）的一种快速、兼容的替代实现（http://pypy.org/），以速度快著称。



```shell
$ PATH=$PATH:/usr/local/python3/bin/python3    # 设置环境变量
$ python3 --version
Python 3.4.0
```
在Window系统下你可以通过以下命令来设置Python的环境变量，假设你的Python安装在 C:\Python34 下:
```doc
set path=%path%;C:\python34
```
## 交互式编程
我们可以在命令提示符中输入"Python"命令来启动Python解释器：

```shell
$ python3
```
执行以上命令后，出现如下窗口信息：
```shell
$ python3
Python 3.4.0 (default, Apr 11 2014, 13:05:11) 
[GCC 4.8.2] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```
在 python 提示符中输入以下语句，然后按回车键查看运行效果：

```shell
print ("Hello, Python!");
```
以上命令执行结果如下：
```shell
Hello, Python!
```
当键入一个多行结构时，续行是必须的。我们可以看下如下 if 语句：

```shell
>>> flag = True
>>> if flag :
...     print("flag 条件为 True!")
... 
flag 条件为 True!
```
## 脚本式编程
将如下代码拷贝至 hello.py文件中：

```shell
print ("Hello, Python!");
```
通过以下命令执行该脚本：

```shell
python3 hello.py
```
输出结果为：

```shell
Hello, Python!
```
在Linux/Unix系统中，你可以在脚本顶部添加以下命令让Python脚本可以像SHELL脚本一样可直接执行：

```shell
#! /usr/bin/env python3.
```
然后修改脚本权限，使其有执行权限，命令如下：

```
$ chmod +x hello.py
```
**关于chmod命令请看：** [Linux chmod命令](http://wuanwanghao.top/archives/linuxchmod%E5%91%BD%E4%BB%A4)
执行以下命令：

```
./hello.py
```
输出结果为：

```shell
Hello, Python!
```